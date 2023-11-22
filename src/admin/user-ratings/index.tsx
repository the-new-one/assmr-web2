/* eslint-disable jsx-a11y/alt-text */
import {useEffect, useState} from 'react';
import { formatDate, toUpperCase } from '../../utils/utilsFunct';
import { SUCCESS_COLOR } from '../../constants/appConstants';
import { DashBoardService } from '../../services/dashboard-service';
import {Rating} from 'react-simple-star-rating';

export const UserRatings = () => {
    const adminService = new DashBoardService();
    const [ratingList, setRatingList] = useState<any>([]);
    const [activeView, setActiveView] = useState<string>('Show company ratings');

    useEffect(() => {
        fetchRatings()
            .then((response) => {
                const {data} = response;
                setRatingList(data.data);
            })
            .catch((err) => {
                alert(err.message);
                console.log(err)
            });
    }, [activeView]);

    function fetchRatings() {
        return adminService.getAllRatings(activeView);
    }
    function onChangeActiveView(param: any) {
        setActiveView(param.target.value);
    }
    return <div>
        <div style={{width: '500px', border: '1px solid #DDD', margin: '0 auto', textAlign: 'center', textTransform: 'capitalize', padding: '10px', marginTop: 10}}>user ratings</div>
        <select className="dropdown" onChange={onChangeActiveView} style={{margin: '10px 0', zIndex: 100, cursor: 'pointer'}}>
            <option>Show company ratings</option>
            <option>Show app ratings</option>
        </select>
        {
            ratingList && (
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-evenly', marginTop: 10, padding: 5}}>
                    {
                        activeView === 'Show company ratings' ?
                        ratingList.map((record: any) => {
                            return <div key={record.id} className="card" style={{width: '50%', position: 'relative', zIndex: 1}}>
                                    <div >
                                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignSelf: 'center', padding: 5}}>
                                        <img src={require('../../assets/img/user.png')} style={{width: 100, height: 100}} />
                                        </div>
                                        <hr />
                                        <div style={{position: 'absolute', right: 0}}>
                                            <button className="btn btn-view-ratings">View</button>
                                        </div>
                                        <p style={{margin: 5}}>Company Name: {record.company_name}</p>
                                        <p style={{margin: 5}}>Branch: {record.company_branch}</p>
                                        <p style={{margin: 5}}>Representative: {record.company_representative}</p>
                                        <p style={{margin: 5}}>Website: {record.website}</p>
                                        <p style={{margin: 5}}>Establish Date: {formatDate(record.company_establish_date)}</p>
                                        <div style={{backgroundColor: SUCCESS_COLOR, borderRadius: 10, padding: 10}}>
                                        <p style={{textAlign: 'center'}}>There are {record.totalCommenter} people rate this!</p>
                                        </div>
                                    </div>
                                </div>
                        })
                        :
                        ratingList.length && ratingList.map((record: any) => {
                            return <div key={record.id} className="card" style={{width: '50%', position: 'relative', zIndex: 1}}>
                                    <div >
                                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignSelf: 'center', padding: 5}}>
                                        <img src={require('../../assets/img/user.png')} style={{width: 100, height: 100}} />
                                        </div>
                                        <hr />
                                        {/* <div style={{position: 'absolute', right: 0}}>
                                            <button className="btn btn-view-ratings">View</button>
                                        </div> */}
                                        <p style={{margin: 5}}>Name: {toUpperCase(`${record?.lastname}, ${record?.firstname} ${record?.middlename?.length ? record?.middlename[0]: ''}.`)}</p>
                                        <p style={{margin: 5}}>Date: {formatDate(record.ratingDate)}</p>
                                        <p style={{margin: 5}}>Website: {record.website}</p>
                                        <p style={{textAlign: 'center'}}>"{record.comment}"</p>
                                        <div style={{display: 'flex', justifyContent: 'center'}} >
                                        <Rating initialValue={record.ratingStar} />
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