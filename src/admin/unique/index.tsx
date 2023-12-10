import {useState, useEffect, useRef} from 'react';
import { DashBoardService } from '../../services/dashboard-service';
import { formatDate } from '../../utils/utilsFunct';
import { Bar } from 'react-chartjs-2';
import { PrinterOutlined } from '@ant-design/icons';
import ReactToPrint, { useReactToPrint } from 'react-to-print'
export const AdminUnique = () => {
    const defaultDate = new Date();
    const adminService = new DashBoardService();
    const [dateFrom, setDateFrom] = useState<string>(`${defaultDate.getFullYear()}-${defaultDate.getMonth()+1}-${defaultDate.getDate()}`);
    const [dateTo, setDateTo] = useState<string>(`${defaultDate.getFullYear()}-${defaultDate.getMonth()+1}-${defaultDate.getDate()}`);
    const [invalidDateRanged, setInvalidDateRanged] = useState<boolean>(false);
    const [recordList, setRecordList] = useState<any>(undefined);
    const [resultList, setResultList] = useState<any>([]);
    const tableRef = useRef(null);

    const [onError, setOnError] = useState<{
        hasError: boolean,
        messageError: string
    }>({
        hasError: false,
        messageError: ''
    });
    const [configRec, setConfigRec] = useState<any>(undefined);
    const options:any = {
        scales: {
          x: {
            ticks: {
              callback: (value: any, index: any, ticks: any) => labels[index], // Display fixed numbers instead of points on the x-axis
            },
          },
          y: {
            ticks: {
              callback: (value: any) => value.toString(), // Display fixed numbers instead of points on the y-axis
            },
            // barPercentage: 1,
          },
        },
        plugins: {
            title: {
                display: true,
                text: `${formatDate(dateFrom)} - ${formatDate(dateTo)}`
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        const newLabel: string[] = [];
                        let totalIndividual: number = 0;
                        resultList.map((value: any) => {
                            if (context.label === 'Jewelry') {
                                totalIndividual = parseInt(value.jewelry);
                            } else if (context.label === 'Vehicle') {
                                totalIndividual = parseInt(value.vehicle);
                            } else if (context.label === 'Realestate') {
                                totalIndividual = parseInt(value.realestate);
                            } else {
                                totalIndividual = parseInt(value.vehicle) + parseInt(value.jewelry) + parseInt(value.realestate);
                            }
                            newLabel.push(`${formatDate(value.posted_date)} - ${totalIndividual}`)
                        })
                        return newLabel;
                    }
                }
            }
        },
      };

    const labels = ['Property posted', 'Vehicle', 'Realestate', 'Jewelry']

    useEffect(() => {
        getAllPostedProperty(`${defaultDate.getFullYear()}-${defaultDate.getMonth()+1}-${defaultDate.getDate()}`, dateTo);
    }, []);
    const onSelectDateFrom = (e: any) => {
        const value = e.target.value;
        setDateFrom(value);
    }
    const onSelectDateTo = (e: any) => {
        const value = e.target.value;
        setDateTo(value);
        if (value && dateFrom) {
            const to = new Date(value);
            const from = new Date(dateFrom);
            
            if (to < from) {
                setOnError({hasError: true, messageError: 'Invalid filtered date.'})
            }
        } else {
            setOnError({hasError: true, messageError: 'Invalid filtered date.'})
        }
    }
    const onFilter = () => {
        setOnError({hasError: false, messageError: ''});
        if (!dateFrom && !dateTo) {
            setOnError({hasError: true, messageError: 'Please select a filtered date.'})
        } else if(!dateFrom) {
            setOnError({hasError: true, messageError: 'Please select a valid date.'})
        }
        else if (!onError.hasError) {   
            getAllPostedProperty(dateFrom, dateTo);
        }
    }

    function getAllPostedProperty(dateFrom?: string, dateTo?: string) {
        adminService.getAdminUniqueRecord(dateFrom, dateTo)
        .then((response: any) => {
            const result = response.data;
            
            if (result.data.length){
                let totalPostedProperty = 0;
                let totalVehicle = 0;
                let totalRealestate = 0;
                let totalJewelry = 0;
                result.data.map((value: any) => {
                    totalPostedProperty+=parseInt(value.vehicle)+parseInt(value.jewelry)+parseInt(value.realestate);
                    totalVehicle+=parseInt(value.vehicle);
                    totalRealestate+=parseInt(value.realestate);
                    totalJewelry+=parseInt(value.jewelry);
                });
                setResultList(result.data);
                setConfigRec({
                    labels: labels,
                    datasets: [{
                        label: formatDate(dateFrom ?? new Date().toString()),
                        data: [totalPostedProperty, totalVehicle, totalRealestate, totalJewelry],
                        backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                        ],
                        borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                        ],
                        borderWidth: 1
                    }]
                });
                setRecordList(result.data);
            }
            else{
                setRecordList(undefined);
            }
        })
        .catch((err: any) => {
            console.log(err);
        });
    }
    const handlePrint = useReactToPrint({
        content: () => tableRef?.current,
    });

    return <div>
        <div className="date-container">
            <div style={{marginBottom: 5}}>Date From: <input className="date-input" type="date" value={dateFrom}
                onChange={onSelectDateFrom} /></div>
            <div style={{marginBottom: 5}}>Date To: <input className="date-input" type="date" value={dateTo}
                onChange={onSelectDateTo} /></div>
            <div className="error-filter">{onError.hasError && onError.messageError}</div>
            <button className="btn btn-filter"
                onClick={onFilter}>filter</button>
        </div>
        {
            configRec && <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{width: '80%', height: 500, marginTop: 30, display: 'flex', justifySelf: 'center', alignContent: 'center', justifyContent: 'center'}}>
                    <Bar options={options} data={configRec} />
                </div>
            </div>
        }
        <button style={{padding: 10, cursor: 'pointer', float: 'right', marginBottom: 10, borderColor: '#fc440f', borderRadius: 10}}
            onClick={handlePrint}>
        <PrinterOutlined />&nbsp;
        Print
        </button>
        <table className="table" ref={tableRef}>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Posted Property</th>
                    <th>Vehicle</th>
                    <th>Realestate</th>
                    <th>Jewelry</th>
                </tr>
            </thead>
            <tbody>
                {
                    recordList ? recordList.map((record: any) => {
                        let total = parseInt(record.vehicle)+parseInt(record.realestate)+parseInt(record.jewelry);
                        return (<tr key={record.posted_date}>
                            <td>{formatDate(record.posted_date)}</td>
                            <td>{total}</td>
                            <td>{record.vehicle}</td>
                            <td>{record.realestate}</td>
                            <td>{record.jewelry}</td>
                        </tr>);
                    }) :
                    <tr>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                    </tr>
                }
            </tbody>
        </table>
    </div>
}