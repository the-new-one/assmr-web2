import { instance } from "../utils/appUtils";

export class DashBoardService {
    getAllDashboardRecrods() {
        return instance.get('/admin/graphs')
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
        return instance.get('/admin/dropped-property');
    }
    getAllRatings(viewType) {
        return instance.get('/admin/get-all-ratings/'+viewType);
    }
    getAdminUniqueRecord(dateFrom, dateTo) {
        return instance.post('/admin/unique', {dateFrom, dateTo});
    } // gipa add ni sir Durano
}