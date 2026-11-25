import 'package:get/get.dart';

import '../../../../../core/base_controllers/load_data_controller.dart';
import '../../../data/data_sources/employees_data_source.dart';
import '../../../data/models/section_model.dart';

class SelectSectionController extends LoadDataController<List<SectionModel>> {
  final Rxn<SectionModel> selectedSection;

  SelectSectionController(this.selectedSection);

  @override
  Future<List<SectionModel>> callApi() => EmployeesDataSource.getSections();

  @override
  void onReady() {
    worker(selectedSection,(_)=>update());
    super.onReady();
  }
  
}
