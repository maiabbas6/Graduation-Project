import '../../../../core/constants/api_const.dart';
import '../../../../core/network/network_helper.dart';
import '../models/appointment_model.dart';
import '../models/cost_model.dart';
import '../models/cost_summary_model.dart';

class CostDataSource {
  static Future<List<CostModel>> getCosts() async {
    var response = await NetworkHelper().get(ApiConst.myCosts);
    List rawList = response.data['data'];
    return rawList.map((json) => CostModel.fromJson(json)).toList();
  }

  static Future<CostSummaryModel> getCostSummary() async {
    var response = await NetworkHelper().get(ApiConst.myCostsSummary);
    return CostSummaryModel.fromJson(response.data['data']);
  }

  static Future<AppointmentModel?> getNextAppointment() async {
    var response = await NetworkHelper().get(ApiConst.appointmentsNext);
    final data = response.data['data'];
    if (data == null) return null;
    return AppointmentModel.fromJson(data);
  }
}
