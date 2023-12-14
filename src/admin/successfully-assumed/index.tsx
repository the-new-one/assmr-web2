import { useEffect, useState } from "react"
import { DashBoardService } from "../../services/dashboard-service";
import { formatDate, toUpperCase } from "../../utils/utilsFunct";
import { APP_COLOR, GOLD_COLOR, SUCCESS_COLOR, SUCCESS_EMERALD } from "../../constants/appConstants";

export const SuccessFullyAssumed = () => {
    const dashBoardService = new DashBoardService();
    const [successfullAssumption, setSuccessFullAssumption] = useState<any>([]);
    
    useEffect(() => {
        listAllSuccessFullyAssumed()
            .then((response) => {
                const {data} = response;
                setSuccessFullAssumption(data.data);
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);
    function listAllSuccessFullyAssumed() {
        return dashBoardService.getAllSuccessFullyAssumed()
    }
    return <div style={{width: '100%', display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap', marginTop: 10, padding: 5}}>

        {
            successfullAssumption.length ? successfullAssumption.map((record: any, index: number) => {
                 
                return <div key={index} className="card">
                    <div className="card-body">
                        <div style={{width: '100%', textAlign: 'center', flexWrap: 'wrap'}}>
                            <img src={require('../../assets/img/user.png')}
                                style={{width: '50px', height: '50px'}}
                            />
                            <div style={{textAlign: 'center'}}>
                                <label htmlFor="owner-lastname">{toUpperCase(record?.lastname+', ')}</label>
                                <label htmlFor="owner-firstname">{toUpperCase(record?.firstname+' ')}</label>
                                <label htmlFor="owner-middlename">{toUpperCase(record?.middlename[0]+'.')}</label>
                            </div>
                        </div>
                    </div>
                    <div style={{padding: '10px'}}>
                        <label>{toUpperCase('Successful Transction')}</label>
                        <hr />
                        {
                            record.property_type === 'jewelry' && (
                                <><p style={{ marginTop: 5 }}>Property type: {record.property_type}</p>
                                <p style={{ marginTop: 5 }}>Owner: {record.jewelry_owner}</p>
                                <p style={{ marginTop: 5 }}>Jewelry: {record.jewelry_name}</p>
                                <p style={{ marginTop: 5 }}>Jewelry Model: {record.jewelry_model}</p>
                                <p style={{ marginTop: 5 }}>Grams: {record.jewelry_grams}</p>
                                <p style={{ marginTop: 5 }}>Karat: {record.user_barangay} {record.jewelry_karat} {record.user_municipality}</p>
                                <p style={{ marginTop: 5 }}>Material: {record.user_barangay} {record.jewelry_material} {record.user_municipality}</p>
                                <p style={{ marginTop: 5 }}>Transaction date: {formatDate(record.transaction_date)}</p>
                                </>

                            )
                        }
                        {
                            record.property_type === 'vehicle' && (
                                <><p style={{ marginTop: 5 }}>Property type: {record.property_type}</p>
                                <p style={{ marginTop: 5 }}>Owner: {record.lastname}, {record.firstname} {record.middlename[0]}.</p>
                                <p style={{ marginTop: 5 }}>Brand: {record.brand}</p>
                                <p style={{ marginTop: 5 }}>Milage: {record.milage}</p>
                                <p style={{ marginTop: 5 }}>Color: {record.color}</p>
                                <p style={{ marginTop: 5 }}>Model: {record.model} {record.jewelry_karat} {record.user_municipality}</p>
                                <p style={{ marginTop: 5 }}>Condition: {record.condition} {record.jewelry_material} {record.user_municipality}</p>
                                <p style={{ marginTop: 5 }}>Transaction date: {formatDate(record.transaction_date)}</p>
                                </>

                            )
                        }
                    </div>
                    <div style={{background: record.isAcceptedAssumer === 1 ? SUCCESS_EMERALD : APP_COLOR, borderRadius: 100, padding: 5, marginTop: 10, textAlign: 'center'}}>
                        {
                            record.isAcceptedAssumer === 1 ? 'Successfully assumed' : 'Not Assumed'
                        }
                    </div>
                </div>
            }) : <div className="card">
                <p style={{textAlign: "center"}}>No records to show.</p>
            </div>
        }
    </div>
}