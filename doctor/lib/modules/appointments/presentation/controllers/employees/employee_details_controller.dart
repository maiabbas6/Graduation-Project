import '../../../../../core/base_controllers/load_data_controller.dart';
import '../../../data/data_sources/employees_data_source.dart';
import '../../../data/models/employee_model.dart';

class EmployeeDetailsController extends LoadDataController<EmployeeModel> {
  final int employeeId;

  EmployeeDetailsController(this.employeeId);

  @override
  Future<EmployeeModel> callApi() =>
      EmployeesDataSource.getEmployeeById(employeeId);

}
