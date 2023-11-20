import { instance } from "../utils/appUtils";

export class DashBoardService {
    getAllDashboardRecrods() {
        return instance.get('/admin/dashboard/dashboard-records')
    }
    getAllOnGoingTransactions(historyValue) {
        return instance.post('/admin/histories', { historyValue })
    }
}