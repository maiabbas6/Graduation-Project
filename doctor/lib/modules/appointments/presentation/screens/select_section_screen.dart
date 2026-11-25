import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:doctor/modules/appointments/presentation/screens/employees_screen.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/core_components/app_scaffold.dart';
import '../../../../core/core_components/state_management/state_component.dart';
import '../../data/models/section_model.dart';
import '../components/section_view.dart';
import '../controllers/select_section/select_section_binding.dart';
import '../controllers/select_section/select_section_controller.dart';

class SelectSectionScreen extends GetView<SelectSectionController> {
  static const _name = '/select-section';

  static final page = GetPage(
    name: _name,
    page: () => const SelectSectionScreen(),
    binding: SelectSectionBinding(),
  );

  const SelectSectionScreen({super.key});

  static void navigate(Rxn<SectionModel> selectedSection) {
    Get.toNamed(_name, arguments: selectedSection);
  }

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(title:Text('Select Section'.tr)),
          ControllerComponent.sliver<List<SectionModel>, SelectSectionController>(
            onSuccess: (_, sections) => SliverGrid.builder(
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2
              ),
              itemCount: sections.length,
              itemBuilder: (_, i) => SectionView(
                isActive: controller.selectedSection.value?.id == sections[i].id,
                section: sections[i],
                onTap: () => controller.selectedSection(sections[i]),
              ),
            ),
          ),
        ],
      ),
      floatingActionButton: Obx(()=>
        AnimatedOpacity(
          duration: Durations.short4,
          opacity: controller.selectedSection.value != null ? 1 : 0,
          child: Visibility(
            visible: controller.selectedSection.value != null,
            child: FloatingActionButton(
              child: Icon(Icons.check),
              onPressed:()=> EmployeesScreen.navigateReplace(controller.selectedSection.value!)
            ),
          ),
        )
      ),
    );
  }
}
