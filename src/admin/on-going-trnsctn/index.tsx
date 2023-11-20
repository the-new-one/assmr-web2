import { useEffect } from "react";
import { DashBoardService } from "../../services/dashboard-service";

export const OnGoingTransactions = () => {
    const dashBoardService = new DashBoardService();
    useEffect(() => {
        getAllOnGoingTransactions()
            .then((response: any) => {
                console.log(response)
            })
            .catch((err: any) => {
                console.log(err);
            });
    }, []);
    function getAllOnGoingTransactions() {
        return dashBoardService.getAllOnGoingTransactions('on-going transaction');
    }
    return <section>
        on going
    </section>
}