import '../../../../core/constants/api_const.dart';
import '../../../../core/network/network_helper.dart';
import '../models/employee_model.dart';
import '../models/section_model.dart';

class EmployeesDataSource {
  static Future<List<SectionModel>> getSections() async {
    var response = await NetworkHelper().get(ApiConst.sections);
    List rawList = response.data['data'];
    return rawList.map((json) => SectionModel.fromJson(json)).toList();
  }

  static Future<List<EmployeeModel>> getEmployeesBySection(int sectionId) async {
    var response = await NetworkHelper().get(
      ApiConst.sectionById(sectionId),
    );
    List rawList = response.data['data'];
    return rawList.map((json) => EmployeeModel.fromJson(json)).toList();
  }

  static Future<EmployeeModel> getEmployeeById(int employeeId) async {
    var response = await NetworkHelper().get(
      ApiConst.employeeById(employeeId),
    );
    print(response);
    return EmployeeModel.fromJson(response.data['data']);
  }

  static Future<List<String>> getEmployeeSchedualsTimesById(int employeeId,DateTime date) async {
    var response = await NetworkHelper().get(
      ApiConst.employeeSchedualsTimesById(employeeId,date),
    );
    return (response.data['data'] as List).map((e)=>e.toString()).toList();
  }
}
