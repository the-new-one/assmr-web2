import {useState} from 'react';
import { DashBoardService } from '../../services/dashboard-service';
import { formatDate } from '../../utils/utilsFunct';

export const AdminUnique = () => {
    const adminService = new DashBoardService();
    const [dateFrom, setDateFrom] = useState<string>();
    const [dateTo, setDateTo] = useState<string>();
    const [invalidDateRanged, setInvalidDateRanged] = useState<boolean>(false);
    const [recordList, setRecordList] = useState<any>(undefined);
    const [onError, setOnError] = useState<{
        hasError: boolean,
        messageError: string
    }>({
        hasError: false,
        messageError: ''
    });

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
        }
    }
    const onFilter = () => {
        setOnError({hasError: false, messageError: ''});
        if (!dateFrom && !dateTo) {
            setOnError({hasError: true, messageError: 'Please select a filtered date.'})
        } else if (!onError.hasError) {            
            adminService.getAdminUniqueRecord(dateFrom, dateTo)
                .then((response: any) => {
                    const result = response.data;
                    // console.log(result);
                    if (result.data.length)
                        setRecordList(result.data);
                    else
                        setRecordList(undefined)
                })
                .catch((err: any) => {
                    console.log(err);
                });
        }
    }

    return <div>
        <div className="date-container">
            <div style={{marginBottom: 5}}>Date From: <input className="date-input" type="date"
                onChange={onSelectDateFrom} /></div>
            <div style={{marginBottom: 5}}>Date To: <input className="date-input" type="date"
                onChange={onSelectDateTo} /></div>
            <div className="error-filter">{onError.hasError && onError.messageError}</div>
            <button className="btn btn-filter"
                onClick={onFilter}>filter</button>
        </div>
        <table className="table">
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
                        return (<tr key={record.property_posted_date}>
                            <td>{formatDate(record.property_posted_date)}</td>
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