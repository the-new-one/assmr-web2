import { instance } from "../utils/appUtils";

export class DashBoardService {
    getAllDashboardRecrods() {
        return instance.get('/admin/dashboard/dashboard-records')
    }
    getAllOnGoingTransactions(historyValue) {
        return instance.post('/admin/histories', { historyValue })
    }
    getAllUserSubscriptions() {
        return instance.get('/admin/subscriptions')
    }
    getAllFeedBacks() {
        return instance.get('/admin/feedbacks');
    }
    getAllDroppedProperty() {
        return instance.get('/admin/dropped-property')
    }
}