import '../../../../../core/base_controllers/load_data_controller.dart';
import '../../../data/data_sources/notification_data_source.dart';
import '../../../data/models/notification_model.dart';

class NotificationListController extends LoadDataController<List<NotificationModel>> {
  @override
  Future<List<NotificationModel>> callApi() {
    return NotificationDataSource.getNotifications();
  }
}
