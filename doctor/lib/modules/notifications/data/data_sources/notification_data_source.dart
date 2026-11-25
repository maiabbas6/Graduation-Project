import '../../../../core/constants/api_const.dart';
import '../../../../core/network/network_helper.dart';
import '../models/notification_model.dart';

class NotificationDataSource {
  static Future<List<NotificationModel>> getNotifications() async {
    var response = await NetworkHelper().get(ApiConst.notifications);
    List rawList = response.data['data'];
    return rawList
        .map((json) => NotificationModel.fromJson(json))
        .toList()
        .cast<NotificationModel>();
  }
}
