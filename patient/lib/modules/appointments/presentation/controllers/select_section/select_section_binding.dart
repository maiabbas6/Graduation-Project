import 'package:get/get.dart';

import '../../../data/models/section_model.dart';
import 'select_section_controller.dart';

class SelectSectionBinding implements Bindings {
  @override
  void dependencies() {
    Get.put<SelectSectionController>(
      SelectSectionController(Get.arguments as Rxn<SectionModel>),
    );
  }
}
