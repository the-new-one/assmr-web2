/* eslint-disable jsx-a11y/alt-text */
import {useState, useEffect} from 'react';
import { DashBoardService } from '../../services/dashboard-service';
import { formatDate, toUpperCase } from '../../utils/utilsFunct';
import { APP_COLOR, GOLD_COLOR } from '../../constants/appConstants';
import '../../css/onGoingCSS.css';

export const UserSubscription = () => {
    const dashBoardService = new DashBoardService();
    const [subscriptionList, setSubscriptionList] = useState<any>([]);

    useEffect(() => {
        getUserSubscriptions()
            .then((response: any) => {
                const {data} = response;
                setSubscriptionList(data.data);
            })
            .catch((err: any) => {
                console.log(err);
            })
    }, []);
    function getUserSubscriptions() {
        return dashBoardService.getAllUserSubscriptions();
    }
    return <div>
        <div style={{width: '500px', border: '1px solid #DDD', margin: '0 auto', textTransform: 'capitalize', padding: '10px', marginTop: 10, textAlign: 'center'}}>user subscriptions</div>
        {
            subscriptionList && (
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap', marginTop: 10, padding: 5}}>
                    {
                        subscriptionList.map((value: any, index: any) => {
                            return <div className="card" key={index}>
                                {/* <div className="card-header" style={{textAlign: 'center'}}>
                                    <h4>On Going Transactions Between</h4>
                                </div> */}
                                <div className="card-body">
                                    <div style={{width: '100%', textAlign: 'center', flexWrap: 'wrap'}}>
                                        <img src={require('../../assets/img/user.png')}
                                            style={{width: '50px', height: '50px'}}
                                        />
                                        <div style={{textAlign: 'center'}}>
                                            <label htmlFor="owner-lastname">{toUpperCase(value.user_lastname+', ')}</label>
                                            <label htmlFor="owner-firstname">{toUpperCase(value.user_firstname+' ')}</label>
                                            <label htmlFor="owner-middlename">{toUpperCase(value.user_middlename[0]+'.')}</label>
                                        </div>
                                    </div>
                                </div>
                                <div style={{padding: '10px'}}>
                                    <label>{toUpperCase('subscription information')}</label>
                                    <hr />
                                    <p style={{marginTop: 5}}>User type: {value.userSub_userType}</p>
                                    <p style={{marginTop: 5}}>Email: {value.user_email}</p>
                                    <p style={{marginTop: 5}}>Max property to post: {value.userSub_maxNoToPost}</p>
                                    <p style={{marginTop: 5}}>Subscription date: {formatDate(value.userSub_subscription_date)}</p>
                                    <p style={{marginTop: 5}}>Subscription expiry date: {formatDate(value.userSub_subscription_expiry)}</p>
                                    <p style={{marginTop: 5}}>Address: {value.user_barangay}, {value.user_province}, {value.user_municipality}</p>
                                </div>
                                <div style={{background: value.userSub_isSubscribed ? GOLD_COLOR : APP_COLOR, borderRadius: 100, padding: 5, marginTop: 10}}>
                                    {
                                        value.userSub_isSubscribed === 1 ? 'Subscriber' : 'Not subscribed'
                                    }
                                </div>
                            </div>
                        })
                    }
                </div>
            )
        }
    </div>
}