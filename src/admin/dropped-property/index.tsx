/* eslint-disable jsx-a11y/alt-text */
import {CSSProperties, useEffect, useState} from 'react';
import { DashBoardService } from '../../services/dashboard-service';
import { BASE_URL, PORT } from '../../utils/appUtils';
import '../../css/onGoingCSS.css';

export const DroppedProperty = () => {
    const dashBoardService = new DashBoardService();
    const [droppedPropertyList, setDroppedPropertyList] = useState<any>([]);

    useEffect(() => {
        getAllDroppedProperty()
            .then((response: any) => {
                const {data} = response;
                setDroppedPropertyList(data.data);
            })
            .catch((err: any) => {
                console.log(err);
                alert(err.message)
            })
    }, []);

    function getAllDroppedProperty() {
        return dashBoardService.getAllDroppedProperty();
    }
    return <div>
        <div style={{width: '500px', border: '1px solid #DDD', margin: '0 auto', textTransform: 'capitalize', padding: '10px', marginTop: 10, textAlign: 'center'}}>dropped property</div>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {
            droppedPropertyList.map((value: any, index: number) => {
                // console.log(value);
                let img: string = ""
                if (value.property_type === 'jewelry' && value.assumePrice.length) {
                    img = JSON.parse(value.assumePrice)[0]
                }
                else if (value.property_type === 'vehicle'){
                    img = JSON.parse(value.img)[0];
                } else if (value.property_type === 'realestate') {
                    img = JSON.parse(value.monthlyPayment)[0];
                }
                return <div className="card" key={index}>
                    <div>
                        <img src={`${BASE_URL}${PORT}/${img}`} style={{width: '200px', height: '200px', margin: '0 auto',
                            display: 'flex', justifyContent: 'center', alignSelf: 'center', alignContent: 'center', alignItems: 'center',
                            justifySelf: 'center'
                        }} />
                    </div>
                    <div>
                        {
                            value.property_type === 'jewelry' && (
                                <>
                                <p>Property type: {value.property_type}</p>
                                <><p style={{marginTop: 5}}>Owner: {value.info1}</p>
                                <p style={{marginTop: 5}}>Jewelry name: {value.info2}</p>
                                <p style={{marginTop: 5}}>Jewelry model: {value.owner}</p>
                                <p style={{marginTop: 5}}>Karat: {value.installmentpaid}</p>
                                <p style={{marginTop: 5}}>Grams: {value.installmentduration}</p>
                                <p style={{marginTop: 5}}>Material: {value.delinquent}</p>
                                <p style={{marginTop: 5}}>Delinquent: {value.info4}</p>
                                <p style={{marginTop: 5}}>Installmentduration: {value.info5}</p>
                                <p style={{marginTop: 5}}>Installmentpaid: {value.issue}</p>
                                <p style={{marginTop: 5}}>Remaining months to paid: {value.monthlyPayment}</p>
                                <p style={{marginTop: 5}}>Monthly payment: {value.info6}</p>
                                <p style={{marginTop: 5}}>Mode of payment: {value.img}</p></>
                                </>
                            )
                        }
                        {
                            value.property_type === 'vehicle' && (
                                <>
                                <p>Property type: {value.property_type}</p>
                                <p style={{marginTop: 5}}>Owner: {value.owner}</p>
                                <p>Color: {value.info3}</p>
                                <p style={{marginTop: 5}}>Brand: {value.info1}</p>
                                <p style={{marginTop: 5}}>Model: {value.info2}</p>
                                <p style={{marginTop: 5}}>Milage: {value.info4}</p>
                                <p style={{marginTop: 5}}>Issue: {value.info5}</p>
                                {/* <p style={{marginTop: 5}}>Downpayment: {value.downpayment}</p> */}
                                <p style={{marginTop: 5}}>Delinquent: {value.delinquent}</p>
                                <p style={{marginTop: 5}}>Installmentduration: {value.installmentduration}</p>
                                <p style={{marginTop: 5}}>Installmentpaid: {value.installmentpaid}</p>
                                <p style={{marginTop: 5}}>Monthly payment: {value.monthlyPayment}</p>
                                <p>Mode of payment: {value.modeOfPayment}</p></>
                            )
                        }
                        {
                            value.property_type === 'realestate' && (
                                <>
                                <p>Property type: {value.property_type}</p>
                                <p>Realestate type: {value.info2}</p>
                                <p>Developer: {value.info2 !== 'lot'? value.modeOfPayment:'NA'}</p>
                                <p style={{marginTop: 5}}>Owner: {value.info1}</p>
                                {/* <p style={{marginTop: 5}}>Downpayment: {value.downpayment}</p> */}
                                <p style={{marginTop: 5}}>Delinquent: {value.delinquent}</p>
                                <p style={{marginTop: 5}}>Installmentduration: {value.downpayment}</p>
                                <p style={{marginTop: 5}}>Installmentpaid: {value.installmentpaid}</p>
                                <p style={{marginTop: 5}}>Monthly payment: {value.assumePrice}</p>
                                <p>Mode of payment: {value.installmentduration}</p></>
                            )
                        }
                    </div>
                    <div style={styleDropped}>status: dropped</div>
                </div>
            })
        }
        </div>
    </div>
}
const styleDropped: CSSProperties = {
    borderRadius: '100px',
    padding: 10,
    backgroundColor: '#f1402951',
    textTransform: 'capitalize',
    textAlign: 'center',
    marginTop: 10,
}