import { useEffect, useState } from "react"
import { DashBoardService } from "../../services/dashboard-service";
import '../../css/onGoingCSS.css';

export const UserList = () => {
    const dashBoardService = new DashBoardService();
    const [userList, setUserList] = useState<any>([]);

    useEffect(() => {
        getAllUsers()
            .then((response: any) => {
                const {data} = response;
                setUserList(data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    function getAllUsers() {
        return dashBoardService.getAllUserLists();
    }

    return <div>
        <div className="card" style={{margin: '0 auto'}}>
            <p style={{textAlign: 'center'}}>Our listed users</p>
        </div>
        <table className="table" style={{marginTop: 10}}>
            <thead>
                <th>Firstname</th>
                <th>Middlename</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Contactno</th>
                <th>Address</th>
                <th>User type</th>
            </thead>
            {
                userList.map((value: any, index: number) => {
                    return <tr>
                        <td>{value.firstname}</td>
                        <td>{value.middlename}</td>
                        <td>{value.lastname}</td>
                        <td>{value.email}</td>
                        <td>{value.gender}</td>
                        <td>{value.contactno}</td>
                        <td>{value.barangay}, {value.municipality}, {value.province}</td>
                        <td>{value.userType}</td>
                    </tr>
                })
            }
        </table>
    </div>
}