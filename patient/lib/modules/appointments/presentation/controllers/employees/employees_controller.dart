import 'package:patient/modules/appointments/data/models/section_model.dart';

import '../../../../../core/base_controllers/load_data_controller.dart';
import '../../../data/data_sources/employees_data_source.dart';
import '../../../data/models/employee_model.dart';

class EmployeesController extends LoadDataController<List<EmployeeModel>> {
  final SectionModel section;

  EmployeesController(this.section);

  @override
  Future<List<EmployeeModel>> callApi() =>
      EmployeesDataSource.getEmployeesBySection(section.id);
}
