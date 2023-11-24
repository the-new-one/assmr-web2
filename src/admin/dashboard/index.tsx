import { useEffect, useState } from "react"
import { DashBoardService } from "../../services/dashboard-service";
import {Bar, Pie} from 'react-chartjs-2';
import '../../css/onGoingCSS.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  );
  
  export const optionsStackedValues = {
    plugins: {
      title: {
        display: true,
        text: 'Posted / Assumed Properties',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
            beginAtZero: false,
            stepSize: 1,
        }
      },
    },
  };
  export const optionsPieValues = {
    plugins: {
      title: {
        display: true,
        text: 'Posted Properties',
      },
    },
    // responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
            beginAtZero: false,
            stepSize: 1
        }
      }
    },
  };
  
  const labels = ['Posted Property', 'Assumed Property'];
  
export const AdminDashboard = () => {
    const dashBoardService = new DashBoardService();
    const [assumedProperty, setAssumedProperty] = useState<any>();
    const [postedProperty, setPostedProperty] = useState<any>();
    const [stackedValues, setStackedValues] = useState<any>(undefined);
    const [piecStackValues, setPieStackValues] = useState<any>(undefined);
    const [propertyInfoList, setPropertyInfoList] = useState<any>(undefined);

    useEffect(() => {
        getDashBoardRecrods()
            .then((response: any) => {
                const resp = response.data;
                setAssumedProperty(resp.data.allAssumedProperty);
                setPostedProperty(resp.data.allPostedProperty);
                console.log(resp.data);
                setPropertyInfoList(resp.data.activeProperties)

                setStackedValues({
                    labels,
                    datasets: [
                      {
                        label: 'Vehicle',
                        data: [resp.data.allPostedProperty.postedPropertyVehicle, resp.data.allAssumedProperty.assumedPropertyVehicle],
                        backgroundColor: 'rgb(255, 99, 132)',
                        // borderWidth: 1,
                        barThickness: 60,
                      },
                      {
                        label: 'Jewelry',
                        data: [resp.data.allPostedProperty.postedPropertyJewelry, resp.data.allAssumedProperty.assumedPropertyJewelry],
                        backgroundColor: 'rgb(75, 192, 192)',
                        // borderWidth: 1,
                        barThickness: 60,
                
                      },
                      {
                        label: 'Realestate',
                        data: [resp.data.allPostedProperty.postedPropertyRealestate, resp.data.allAssumedProperty.assumedPropertyRealestate],
                        backgroundColor: 'rgb(53, 162, 235)',
                        // borderWidth: 1,
                        barThickness: 60,
                
                      },
                    
                    ],
                });
                
                setPieStackValues({
                labels: ['Vehicle', 'Realestate', 'Jewelry'],
                datasets: [
                    {
                    label: '# of Votes',
                    data: [resp.data.allPostedProperty.postedPropertyVehicle, resp.data.allPostedProperty.postedPropertyRealestate, resp.data.allPostedProperty.postedPropertyJewelry],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1,
                    },
                ],
                });

            })
            .catch((err: any) => {
                console.log(err);
            });
    }, []);
    function getDashBoardRecrods() {
        return dashBoardService.getAllDashboardRecrods();
    }
    return <>
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {stackedValues && 
                <div style={{width: '50%', height: 500}}>
                    <Bar options={optionsStackedValues} data={stackedValues} />
                </div>
            }
            {piecStackValues && <div style={{width: '50%', height: 500, marginTop: -200}}>
                <Pie options={optionsPieValues} data={piecStackValues}/>
            </div>}
            {
              propertyInfoList && 
              <table style={{marginTop: -150}} className="table">
                <thead>
                  <th>Owner</th>
                  <th>Property type</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Amount</th>
                </thead>
                {
                  propertyInfoList.map((value: any) => {
                    return <tr>
                      <td>
                        { 
                          value.property_type === 'vehicle' ? value.owner :
                          value.property_type === 'jewelry' ? value.info1 : ''
                        }
                      </td>
                      <td>{value.property_type}</td>
                      <td>{value.property_type}</td>
                      <td>Active</td>
                      <td>
                      { 
                          value.property_type === 'vehicle' ? value.installmentpaid :
                          value.property_type === 'jewelry' ? value.issue : ''
                        }
                      </td>
                    </tr>
                  })
                }
              </table>
            }
        </div>
    </>
}