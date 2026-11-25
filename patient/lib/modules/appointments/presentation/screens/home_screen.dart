import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/core_components/app_bottom_nav_bar.dart';
import '../../../../core/core_components/app_scaffold.dart';
import '../../../../core/core_components/state_management/state_component.dart';
import '../../../../core/constants/color_const.dart';

import '../components/welcome_component.dart';
import '../components/next_appointment_component.dart';
import '../components/cost_summary_card.dart';
import '../components/cost_card.dart';
import '../controllers/home/home_controller.dart';
import '../controllers/home/home_binding.dart';
import '../../../notifications/presentation/screens/notification_list_screen.dart';

class HomeScreen extends GetView<HomeController> {
  const HomeScreen({super.key});

  static const route = '/home';

  static final page = GetPage(
    name: route,
    page: () => const HomeScreen(),
    binding: HomeBinding(),
  );

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            title: Text(
              'Patient',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18.sp),
            ),
            actions: [
              IconButton(
                icon: Badge(
                  label: Text(
                    '3',
                    style: TextStyle(
                      fontSize: 12.sp,
                      color: AppColors.buttonColorFont,
                    ),
                  ),
                  child: Icon(Icons.notifications_outlined, size: 7.5.vmin),
                ),
                onPressed: () => NotificationListScreen.navigate(),
              ),
            ],
          ),
          SliverToBoxAdapter(child: const WelcomeComponent()),
          GetBuilder<HomeController>(
            builder: (controller) => StatusComponent.sliver(
              state: controller.dataState,
              onSuccess: (context, data) => SliverList(
                delegate: SliverChildListDelegate([
                  NextAppointmentComponent(
                    appointment: data.nextAppointment,
                  ),
                  CostSummaryCard(summary: data.summary),
                  SizedBox(height: 1.h),
                  ...data.costs.map(
                    (cost) => CostCard(cost: cost),
                  ),
                  SizedBox(height: 4.h),
                ]),
              ),
            ),
          ),
        ],
      ),
      bottomNavigationBar: const AppBottomNavBar(currentIndex: 0),
    );
  }
}
