import '../../../../core/constants/api_const.dart';
import '../../../../core/network/network_helper.dart';
import '../models/room_service_model.dart';

class RoomServiceDataSource {
  static Future<List<RoomServiceModel>> getRoomServices() async {
    var response = await NetworkHelper().get(ApiConst.roomServices);
    List rawList = response.data['data'];
    return rawList.map((json) => RoomServiceModel.fromJson(json)).toList();
  }

  static Future<dynamic> createRoomServiceUser({
    required int roomServiceId,
    required int roomId,
    required int employeeId,
    String status = 'waiting',
  }) async {
    return await NetworkHelper().post(
      ApiConst.roomServiceUsers,
      body: {
        'room_service_id': roomServiceId,
        'room_id': roomId,
        'employee_id': employeeId,
        'status': status,
      },
    );
  }
}
