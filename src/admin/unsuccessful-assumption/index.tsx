import { useEffect, useState } from "react"
import { DashBoardService } from "../../services/dashboard-service";
import { formatDate, toUpperCase } from "../../utils/utilsFunct";
import { APP_COLOR, SUCCESS_EMERALD } from "../../constants/appConstants";

export const UnsuccessfullTransaction = () => {
    const dashBoardService = new DashBoardService();
    const [unSuccessFulTransction, setUnSuccessFulTransaction] = useState<any>('');

    useEffect(() => {
        getUnsuccessfulTransaction()
            .then((response: any) => {
                const {data} = response;
                // console.log(data.data);
                setUnSuccessFulTransaction(data.data);
            })
            .catch((err: any) => {
                console.log(err);
            })
    }, []);
    
    function getUnsuccessfulTransaction() {
        return dashBoardService.getAllUnsuccessfullTransactions();
    }

    return <div style={{width: '100%', display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap', marginTop: 10, padding: 5}}>

    {
        unSuccessFulTransction ? unSuccessFulTransction.map((record: any, index: number) => {
             
            return <div key={index} className="card">
                <div className="card-body">
                    <div style={{width: '100%', textAlign: 'center', flexWrap: 'wrap'}}>
                        <img src={require('../../assets/img/user.png')}
                            style={{width: '50px', height: '50px'}}
                        />
                        <div style={{textAlign: 'center'}}>
                            <label htmlFor="owner-lastname">{toUpperCase(record?.lastname+', ')}</label>
                            <label htmlFor="owner-firstname">{toUpperCase(record?.firstname+' ')}</label>
                            <label htmlFor="owner-middlename">{toUpperCase(record?.middlename+'.')}</label>
                        </div>
                    </div>
                </div>
                <div style={{padding: '10px'}}>
                    <label>{toUpperCase('Unsuccessful Transction')}</label>
                    <hr />
                    {
                        record.property_type === 'vehicle' && (
                            <><p style={{ marginTop: 5 }}>Property type: {record.property_type}</p>
                            {/* <p style={{ marginTop: 5 }}>Owner: {record.jewelry_owner}</p> */}
                            <p style={{ marginTop: 5 }}>Color: {record.info1} {record.jewelry_karat} {record.user_municipality}</p>
                            <p style={{ marginTop: 5 }}>Brand: {record.info2}</p>
                            <p style={{ marginTop: 5 }}>Model: {record.info3}</p>
                            <p style={{ marginTop: 5 }}>Milage: {record.info4}</p>
                            <p style={{ marginTop: 5 }}>Transaction date: {formatDate(record.transaction_date)}</p>
                            </>

                        )
                    }
                    {
                        record.property_type === 'jewelry' && (
                            <><p style={{ marginTop: 5 }}>Property type: {record.property_type}</p>
                            {/* <p style={{ marginTop: 5 }}>Owner: {record.jewelry_owner}</p> */}
                            <p style={{ marginTop: 5 }}>Name: {record.info1}</p>
                            <p style={{ marginTop: 5 }}>Karat: {record.info2}</p>
                            <p style={{ marginTop: 5 }}>Grams: {record.info3}</p>
                            <p style={{ marginTop: 5 }}>Material: {record.info4}</p>
                            <p style={{ marginTop: 5 }}>Transaction date: {formatDate(record.transaction_date)}</p>
                            </>

                        )
                    }
                    {
                        record.property_type === 'realestate' && (
                            <><p style={{ marginTop: 5 }}>Property type: {record.property_type}</p>
                            {/* <p style={{ marginTop: 5 }}>Owner: {record.jewelry_owner}</p> */}
                            <p style={{ marginTop: 5 }}>Realestate Type: {record.info1}</p>
                            {/* <p style={{ marginTop: 5 }}>Model: {record.info3}</p> */}
                            {/* <p style={{ marginTop: 5 }}>Milage: {record.info4}</p> */}
                            <p style={{ marginTop: 5 }}>Transaction date: {formatDate(record.transaction_date)}</p>
                            </>

                        )
                    }
                    
                </div>
                <div style={{background: record.isAcceptedAssumer === 1 ? SUCCESS_EMERALD : APP_COLOR, borderRadius: 100, padding: 5, marginTop: 10, textAlign: 'center'}}>
                    {
                        record.isAcceptedAssumer === 1 ? 'Successfully assumed' : 'Failed / Cancelled transaction'
                    }
                </div>
            </div>
        }) : <div className="card">
            <p style={{textAlign: "center"}}>No records to show.</p>
        </div>
    }
</div>
}