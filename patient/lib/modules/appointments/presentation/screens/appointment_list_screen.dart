import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:patient/modules/appointments/presentation/components/new_appointment_card.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/constants/color_const.dart';
import '../../../../core/core_components/app_scaffold.dart';
import '../../../../core/core_components/app_bottom_nav_bar.dart';
import '../../../../core/core_components/state_management/state_component.dart';
import '../controllers/appointment_list/appointment_list_controller.dart';
import '../controllers/appointment_list/appointment_list_binding.dart';
import '../components/appointment_card.dart';
import '../../data/models/appointment_model.dart';
import 'appointment_info_screen.dart';

class AppointmentListScreen extends GetView<AppointmentListController> {
  static const route = '/appointments';

  static GetPage page = GetPage(
    name: route,
    page: () => const AppointmentListScreen(),
    binding: AppointmentListBinding(),
  );

  const AppointmentListScreen({super.key});

  void _confirmDelete(AppointmentModel appointment) {
    if(appointment.status == AppointmentStatus.waiting)
    Get.defaultDialog(
      title: 'Delete Appointment'.tr,
      middleText:
          'Are you sure you want to delete this appointment?'.tr,
      textConfirm: 'Delete'.tr,
      textCancel: 'Cancel'.tr,
      confirmTextColor: Colors.white,
      onConfirm: () {
        Get.back();
        controller.deleteAppointment(appointment.id);
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            title: Text(
              'Appointments',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18.sp),
            ),
            floating: true,
            snap: true,
            elevation: 0,
            backgroundColor: Theme.of(context).scaffoldBackgroundColor,
            foregroundColor: Theme.of(context).primaryColor,
          ),
          SliverToBoxAdapter(
            child:NewAppointmentCard(),
          ),
          GetBuilder<AppointmentListController>(
            builder: (controller) => StatusComponent.sliver(
              state: controller.dataState,
              onSuccess: (context, data) {
                if (data.isEmpty) {
                  return SliverFillRemaining(
                    child: Center(child: Text('No appointments found'.tr)),
                  );
                }
                return SliverList(
                  delegate: SliverChildBuilderDelegate((context, index) {
                    final appointment = data[index];
                    return AppointmentCard(
                      appointment: appointment,
                      onTap: () => AppointmentInfoScreen.navigate(appointment),
                      onLongPress: () => _confirmDelete(appointment),
                    );
                  }, childCount: data.length),
                );
              },
            ),
          ),
        ],
      ),
      bottomNavigationBar: const AppBottomNavBar(currentIndex: 1),
    );
  }
}
