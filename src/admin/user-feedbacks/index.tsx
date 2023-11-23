import {useState, useEffect, CSSProperties} from 'react';
import { formatDate, toUpperCase } from '../../utils/utilsFunct';
import { APP_COLOR, GOLD_COLOR } from '../../constants/appConstants';
import { DashBoardService } from '../../services/dashboard-service';

export const UserFeedBacks = () => {
    const dashBoardService = new DashBoardService();
    const [feedBackList, setFeedBackList] = useState<any>([]);

    useEffect(() => {
        getUserFeedBacks()
            .then((response: any) => {
                const {data} = response.data;
                setFeedBackList(data)
            })
            .catch((err: any) => {
                console.log(err);
            })
    }, []);
    function getUserFeedBacks() {
        return dashBoardService.getAllFeedBacks();
    }
    return <div>
        <div style={{width: '500px', border: '1px solid #DDD', margin: '0 auto', textAlign: 'center', textTransform: 'capitalize', padding: '10px', marginTop: 10}}>user feedbacks</div>
        {
            feedBackList && (
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-evenly', marginTop: 10, padding: 5}}>
                    {
                        feedBackList.map((value: any, index: any) => {
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
                                            <label htmlFor="owner-lastname">{toUpperCase(value.feeds_fullName+', ')}</label>
                                        </div>
                                    </div>
                                </div>
                                <div style={{padding: '10px'}}>
                                    <hr />
                                    <div style={{textAlign: 'center'}}>
                                        <p style={{marginTop: 5}}>{value.feeds_email}</p>
                                        <p style={{fontSize: 20}}>{value.feeds_userComments}</p>
                                        <p style={{marginTop: 5, fontSize: 10}}>{formatDate(value.feeds_feedBackDate)}</p>
                                    </div>
                                    <div style={satisfactionStyle}>
                                        {value.feeds_satisfaction   }
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            )
        }
    </div>
}
const satisfactionStyle: CSSProperties = {
    borderRadius: '100px',
    padding: 5,
    backgroundColor: '#49ab58',
    textTransform: 'capitalize',
    textAlign: 'center',
    marginTop: 10
};
