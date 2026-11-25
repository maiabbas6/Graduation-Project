import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/constants/color_const.dart';
import '../../../../core/core_components/app_scaffold.dart';
import '../../../../core/core_components/state_management/state_component.dart';
import '../../data/models/appointment_model.dart';
import '../../data/models/room_service_model.dart';
import '../controllers/room_services/room_services_binding.dart';
import '../controllers/room_services/room_services_controller.dart';

class RoomServicesScreen extends GetView<RoomServicesController> {
  static const _name = '/room-services';

  static final page = GetPage(
    name: _name,
    page: () => const RoomServicesScreen(),
    binding: RoomServicesBinding(),
  );

  static void navigate(AppointmentModel appointment) {
    Get.toNamed(_name, arguments: appointment);
  }

  const RoomServicesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      appBar: AppBar(title: Text('Room Services'.tr)),
      body: CustomScrollView(
        slivers: [
          ControllerComponent.sliver<List<RoomServiceModel>,
              RoomServicesController>(
            onSuccess: (_, services) => services.isEmpty
                ? SliverFillRemaining(
                    child: Center(child: Text('No services found'.tr)),
                  )
                : SliverList.builder(
                      itemBuilder:(_, i) => _ServiceTile(
                        service: services[i],
                      ),
                      itemCount: services.length,
                    ),
          ),
          SliverToBoxAdapter(
            child: Obx(() {
              final enabled = controller.selectedService.value != null;
              return Padding(
                padding: EdgeInsets.all(4.vmin),
                child: GestureDetector(
                  onTap: enabled ? controller.submit : null,
                  child: Container(
                    height: 12.vmin,
                    decoration: BoxDecoration(
                      color: enabled
                          ? AppColors.primary
                          : AppColors.textSecondary,
                      borderRadius: BorderRadius.circular(2.vmin),
                    ),
                    alignment: Alignment.center,
                    child: Text(
                      'Book Service'.tr,
                      style: TextStyle(
                        fontSize: 15.sp,
                        fontWeight: FontWeight.bold,
                        color: AppColors.buttonColorFont,
                      ),
                    ),
                  ),
                ),
              );
            }),
          ),
        ],
      ),
    );
  }
}

class _ServiceTile extends GetView<RoomServicesController> {
  
  final RoomServiceModel service;

  const _ServiceTile({
    required this.service,
  });

  @override
  Widget build(BuildContext context) {
    final selected = controller.selectedService.value?.id == service.id;
    return GestureDetector(
      onTap: () => controller.selectedService.value = service,
      child: Container(
        margin: EdgeInsets.symmetric(horizontal: 4.vmin, vertical: 1.vmin),
        padding: EdgeInsets.all(3.vmin),
        decoration: BoxDecoration(
          color: selected
              ? AppColors.primary.withOpacity(0.1)
              : AppColors.surface,
          borderRadius: BorderRadius.circular(2.vmin),
          border: selected
              ? Border.all(color: AppColors.primary, width: 0.4.vmin)
              : null,
          boxShadow: [
            BoxShadow(
              color: AppColors.shadowColor,
              blurRadius: 2.vmin,
              offset: const Offset(0, 1),
            ),
          ],
        ),
        child: Row(
          children: [
            Expanded(
              child: Text(
                service.name,
                style: TextStyle(
                  fontSize: 15.sp,
                  fontWeight: FontWeight.w600,
                  color: AppColors.textPrimary,
                ),
              ),
            ),
            SizedBox(width: 2.vmin),
            Text(
              '\$${service.price}',
              style: TextStyle(
                fontSize: 14.sp,
                fontWeight: FontWeight.bold,
                color: AppColors.primary,
              ),
            ),
            SizedBox(width: 2.vmin),
            Obx(()=>Icon(
              controller.selectedService.value?.id == service.id ? Icons.check_circle : Icons.circle_outlined,
              color: selected ? AppColors.primary : AppColors.textSecondary,
              size: 5.vmin,
            )),
          ],
        ),
      ),
    );
  }
}
