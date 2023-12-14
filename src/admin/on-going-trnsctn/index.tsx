/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { DashBoardService } from "../../services/dashboard-service";
import '../../css/onGoingCSS.css';
import { toUpperCase } from "../../utils/utilsFunct";
import { SUCCESS_COLOR } from "../../constants/appConstants";

export const OnGoingTransactions = () => {
    const dashBoardService = new DashBoardService();
    const [onGoingTransactions, setOnGoingTransactions] = useState<any>([]);

    useEffect(() => {
        getAllOnGoingTransactions()
            .then((response: any) => {
                const {data} = response.data;
                console.log(data.result)
                setOnGoingTransactions(data.result);
            })
            .catch((err: any) => {
                console.log(err);
            });
    }, []);
    function getAllOnGoingTransactions() {
        return dashBoardService.getAllOnGoingTransactions('on-going transaction');
    }
    return <section style={{padding: 10}}>
        <div style={{width: '400px', margin: '0 auto', padding: 10, border: '1px solid #DDD', textAlign: 'center', marginBottom: 5, textTransform: 'capitalize'}}>on going</div>
        {
            onGoingTransactions && (
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
                    {
                        onGoingTransactions.map((value: any, index: any) => {
                            return <div className="card" key={index}>
                                <div className="card-header" style={{textAlign: 'center'}}>
                                    <h4>On Going Transactions Between</h4>
                                </div>
                                <div className="card-body">
                                    <div style={{width: '50%', textAlign: 'center', flexWrap: 'wrap'}}>
                                        <img src={require('../../assets/img/user.png')}
                                            style={{width: '50px', height: '50px'}}
                                        />
                                        <div style={{textAlign: 'center'}}>
                                            <label htmlFor="owner-lastname">{toUpperCase(value.userOwner_lastname+', ')}</label>
                                            <label htmlFor="owner-firstname">{toUpperCase(value.userOwner_firstname+' ')}</label>
                                            <label htmlFor="owner-middlename">{toUpperCase(value.userOwner_middlename[0]+'.')}</label>
                                        </div>
                                    </div>
                                    <div style={{width: '50%', textAlign: 'center'}}>
                                        <img src={require('../../assets/img/user.png')}
                                            style={{width: '50px', height: '50px'}}
                                        />
                                        <div style={{textAlign: 'center'}}>
                                            <label htmlFor="owner-lastname">{toUpperCase(value.userAssumer_lastname+', ')}</label>
                                            <label htmlFor="owner-firstname">{toUpperCase(value.userAssumer_firstname+' ')}</label>
                                            <label htmlFor="owner-middlename">{toUpperCase(value.userAssumer_middlename[0]+'.')}</label>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div style={{padding: '10px'}}>
                                    <label>{toUpperCase('property information')}</label>
                                    {
                                        value.property_property_type === 'vehicle' ?
                                        (
                                            <div className="property-info">
                                                <p>Color: {value.vehicle_color}</p>
                                                <p>Brand: {value.vehicle_brand}</p>
                                                <p>Milage: {value.vehicle_milage}</p>
                                                <p>Condition: {value.vehicle_condition}</p>
                                                <p>Issue: {value.vehicle_issue}</p>
                                                <p>Downpayment: {value.vehicle_downpayment}</p>
                                                <p>Installmentpaid: {value.vehicle_installmentpaid}</p>
                                                <p>Installmentduration: {value.vehicle_installmentduration}</p>
                                                <p>Delinquent: {value.vehicle_delinquent}</p>
                                                <p>Issue: {value.vehicle_issue}</p>
                                                <p>Remaining months to paid: {value.vehicle_remainingMonthsToPaid}</p>
                                                <p>Monthly payment: {value.vehicle_monthlyPayment}</p>
                                            </div>
                                        )
                                        :value.property_property_type === 'jewelry' ?
                                        (
                                            <div className="property-info">
                                                <p>Name: {value.jewelry_jewelry_name}</p>
                                                <p>Karat: {value.jewelry_jewelry_karat}</p>
                                                <p>Model: {value.jewelry_jewelry_model}</p>
                                                <p>Grams: {value.jewelry_jewelry_grams}</p>
                                                <p>Downpayment: {value.jewelry_jewelry_downpayment}</p>
                                                <p>Installmentpaid: {value.jewelry_jewelry_installmentpaid}</p>
                                                <p>Installmentduration: {value.jewelry_jewelry_installmentduration}</p>
                                                <p>Delinquent: {value.jewelry_jewelry_delinquent}</p>
                                                <p>Remaining months to paid: {value.jewelry_remainingMonthsToPaid}</p>
                                                <p>Monthly payment: {value.jewelry_monthlyPayment}</p>
                                            </div>
                                        )
                                        : (
                                            <div className="property-info">
                                                <p>Realestate type: {value.realestate_realestateType}</p>
                                                <p>Downpayment: {value.realestate_downpayment}</p>
                                                <p>Installmentpaid: {value.realestate_installmentpaid}</p>
                                                <p>Installmentduration: {value.realestate_installmentduration}</p>
                                                <p>Delinquent: {value.realestate_delinquent}</p>
                                                <p>Remaining months to paid: {value.realestate_remainingMonthsToPaid}</p>
                                                <p>Monthly payment: {value.realestate_monthlyPayment}</p>
                                                <p>Mode of payment: {value.realestate_modeOfPayment}</p>
                                            </div>
                                        )
                                    }
                                </div>
                                <div style={{background: SUCCESS_COLOR, borderRadius: 100, padding: 5, marginTop: 10}}>
                                    {toUpperCase(value.property_property_type)}
                                </div>
                            </div>
                        })
                    }
                </div>
            )
        }
    </section>
}