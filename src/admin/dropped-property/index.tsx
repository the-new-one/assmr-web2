import {useEffect, useState} from 'react';
import { DashBoardService } from '../../services/dashboard-service';

export const DroppedProperty = () => {
    const dashBoardService = new DashBoardService();
    const [droppedProperty, setDroppedProperty] = useState<any>([]);

    useEffect(() => {
        getAllDroppedProperty()
            .then((response: any) => {
                console.log(response);
            })
            .catch((err: any) => {
                console.log(err);
            })
    }, []);

    function getAllDroppedProperty() {
        return dashBoardService.getAllDroppedProperty();
    }
    return <div>
        <div style={{width: '500px', border: '1px solid #DDD', margin: '0 auto', textTransform: 'capitalize', padding: '10px', marginTop: 10, textAlign: 'center'}}>dropped property</div>
    </div>
}