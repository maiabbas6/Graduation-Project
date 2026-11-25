import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../../../core/core_components/app_scaffold.dart';
import '../../../../core/core_components/app_loader.dart';
import '../../../../core/core_components/empty_view.dart';
import '../../../../core/core_components/state_management/state_component.dart';
import '../../data/models/employee_model.dart';
import '../../data/models/section_model.dart';
import '../components/employee_view.dart';
import '../controllers/employees/employees_binding.dart';
import '../controllers/employees/employees_controller.dart';
import 'employee_details_screen.dart';

class EmployeesScreen extends GetView<EmployeesController> {
  const EmployeesScreen({super.key});

  static const _name = '/home/section-employees';

  static final page = GetPage(
    name: _name,
    page: () => const EmployeesScreen(),
    binding: EmployeesBinding(),
  );

  static void navigate(SectionModel section) {
    Get.toNamed(_name, arguments: section);
  }

  static void navigateReplace(SectionModel section) {
    Get.offNamed(_name, arguments: section);
  }

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      appBar: AppBar(
        title: Text(controller.section.name),
      ),
      body: CustomScrollView(
        slivers: [
          ControllerComponent.sliver<List<EmployeeModel>, EmployeesController>(
            onSuccess: (_, employees) => EmptyView.sliver(
              isEmpty: employees.isEmpty,
              onNotEmpty: (_) => SliverList.builder(
                itemCount: employees.length,
                itemBuilder: (_, i) => GestureDetector(
                  onTap: () => EmployeeDetailsScreen.navigate(employees[i].id),
                  child: EmployeeView(employee: employees[i]),
                ),
              ),
            ),
            onLoading: (_) => const SliverToBoxAdapter(
              child: Center(child: AppLoader()),
            ),
          ),
        ],
      ),
    );
  }
}
