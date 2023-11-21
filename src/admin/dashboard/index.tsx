import { useEffect } from "react"
import { DashBoardService } from "../../services/dashboard-service";

export const AdminDashboard = () => {
    const dashBoardService = new DashBoardService();
    useEffect(() => {
        getDashBoardRecrods()
            .then((response: any) => {
                console.log(response)
            })
            .catch((err: any) => {
                console.log(err);
            });
    }, []);
    function getDashBoardRecrods() {
        return dashBoardService.getAllDashboardRecrods();
    }
    return <p>admin dash</p>
}