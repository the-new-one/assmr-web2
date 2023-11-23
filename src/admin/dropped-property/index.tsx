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
        {
            droppedPropertyList.map((value: any) => {
                // console.log(value);
                let img: string = ""
                if (value.property_type === 'jewelry') {
                    img = JSON.parse(value.assumePrice)[0]
                }
                else {
                    img = JSON.parse(value.img);
                }
                return <div className="card" key={value.id}>
                    <div >
                        <img src={`${BASE_URL}${PORT}/${img}`} style={{width: '200px', height: '200px', 
                            display: 'flex', justifyContent: 'center', alignSelf: 'center', alignContent: 'center', alignItems: 'center',
                            justifySelf: 'center'
                        }} />
                    </div>
                    <div>
                        {
                            value.property_type === 'jewelry' && (
                                <>
                                <><p>Owner: {value.info1}</p>
                                <p>Jewelry name: {value.info2}</p>
                                <p>Jewelry model: {value.owner}</p>
                                <p>Karat: {value.installmentpaid}</p>
                                <p>Grams: {value.installmentduration}</p>
                                <p>Material: {value.delinquent}</p>
                                <p>Delinquent: {value.info4}</p>
                                <p>Installmentduration: {value.info5}</p>
                                <p>Installmentpaid: {value.issue}</p>
                                <p>Remaining months to paid: {value.monthlyPayment}</p>
                                <p>Monthly payment: {value.info6}</p>
                                <p>Mode of payment: {value.img}</p></>
                                </>
                            )
                        }
                        {
                            value.property_type === 'vehicle' && (
                                <><p>Owner: {value.owner}</p><p>Color: {value.info3}</p><p>Brand: {value.info1}</p><p>Model: {value.info2}</p><p>Milage: {value.info4}</p><p>Issue: {value.info5}</p><p>Downpayment: {value.downpayment}</p><p>Delinquent: {value.delinquent}</p><p>Installmentduration: {value.installmentduration}</p><p>Installmentpaid: {value.installmentpaid}</p><p>Monthly payment: {value.monthlyPayment}</p><p>Mode of payment: {value.modeOfPayment}</p></>
                            )
                        }
                    </div>
                    <div style={styleDropped}>status: dropped</div>
                </div>
            })
        }
    </div>
}
const styleDropped: CSSProperties = {
    borderRadius: '100px',
    padding: 10,
    backgroundColor: '#f1402951',
    textTransform: 'capitalize',
    textAlign: 'center',
}