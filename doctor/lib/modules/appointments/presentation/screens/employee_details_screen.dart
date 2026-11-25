import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:get/get.dart';
import '../../../../core/data_state/data_state.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import '../../../../core/constants/color_const.dart';
import '../controllers/employees/employee_details_controller.dart';
import '../controllers/employees/employee_details_binding.dart';
import '../components/employee_view.dart';
import '../../data/models/employee_model.dart';

class EmployeeDetailsScreen extends GetView<EmployeeDetailsController>{
  final int employeeId;

  const EmployeeDetailsScreen({super.key, required this.employeeId});

  static const _name = '/home/employee-details';

  static final page = GetPage(
    name: _name,
    page: () => EmployeeDetailsScreen(employeeId: Get.arguments),
    binding: EmployeeDetailsBinding(),
  );

  static void navigate(int employeeId) {
    Get.toNamed(_name, arguments: employeeId);
  }

  @override
  @override
  Widget build(BuildContext context) {
    return GetBuilder<EmployeeDetailsController>(
      builder: (_) {
        if (controller.status == DataStatus.loading) {
          return Scaffold(
            appBar: AppBar(title: Text('Loading Details'.tr), elevation: 0),
            body: const Center(child: CircularProgressIndicator()),
          );
        } else if (controller.status == DataStatus.error) {
          return Scaffold(
            appBar: AppBar(title: Text('Error'.tr), elevation: 0),
            body: Center(
              child: Padding(
                padding: EdgeInsets.all(4.w),
                child: Text(
                  controller.dataState.exception.toString(),
                  style: TextStyle(fontSize: 16.sp, color: Colors.red),
                  textAlign: TextAlign.center,
                ),
              ),
            ),
          );
        }

        final employee = controller.data;
        return Scaffold(
          appBar: AppBar(
            title: Text(
              '${employee.user?.roles.firstOrNull ?? 'Employee'.tr} Details',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18.sp),
            ),
            elevation: 0,
            backgroundColor: Theme.of(context).scaffoldBackgroundColor,
            foregroundColor: Theme.of(context).primaryColor,
          ),
          body: SingleChildScrollView(
            padding: EdgeInsets.symmetric(horizontal: 4.vmin, vertical: 2.vmin),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                EmployeeView(employee: employee),
                SizedBox(height: 4.vmin),
                _buildInfoGrid(employee),
                SizedBox(height: 4.vmin),
                _buildPersonalInfo(employee),
                SizedBox(height: 4.vmin),
                _buildSection(
                  'Qualifications'.tr,
                  employee.qualifications,
                ),
                SizedBox(height: 4.vmin),
                Text(
                  'Schedules'.tr,
                  style: TextStyle(
                    fontSize: 18.sp,
                    fontWeight: FontWeight.w700,
                    color: AppColors.textPrimary,
                  ),
                ),
                SizedBox(height: 2.vmin),
                ListView.separated(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: employee.schedules.length,
                  separatorBuilder: (context, index) =>
                      SizedBox(height: 1.5.vmin),
                  itemBuilder: (context, index) {
                    final schedule = employee.schedules[index];
                    return Container(
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: Colors.grey.shade200),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.03),
                            blurRadius: 4,
                            offset: const Offset(0, 2),
                          ),
                        ],
                      ),
                      child: ListTile(
                        contentPadding: EdgeInsets.symmetric(
                          horizontal: 4.vmin,
                          vertical: 0.5.vmin,
                        ),
                        leading: CircleAvatar(
                          backgroundColor: context.theme.primaryColor
                              .withOpacity(0.1),
                          child: Icon(
                            Icons.access_time_rounded,
                            color: context.theme.primaryColor,
                          ),
                        ),
                        title: Text(
                          schedule.dayName,
                          style: TextStyle(
                            fontWeight: FontWeight.w600,
                            fontSize: 16.sp,
                          ),
                        ),
                        subtitle: Text(
                          '${schedule.startAt} - ${schedule.endAt}',
                          style: TextStyle(
                            color: Colors.grey.shade600,
                            fontSize: 14.sp,
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ],
            ),
          ),
        );
      },
    );
  }
  Widget _buildInfoGrid(EmployeeModel employee) {
    return Builder(
      builder: (context) {
        return Container(
          padding: EdgeInsets.all(4.vmin),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: Colors.grey.shade200),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildInfoItem(
                context,
                SvgPicture.network(employee.section!.icon,colorFilter: ColorFilter.mode(
                  context.theme.primaryColor,
                  BlendMode.srcIn
                ),
               ),
                'Section'.tr,
                '${employee.section?.name}',
              ),
              _buildInfoItem(
                context,
                Icon(Icons.badge_outlined,color: context.theme.primaryColor,),
                'License'.tr,
                employee.licenseNo.isNotEmpty ? employee.licenseNo : 'N/A'.tr,
              ),
            ],
          ),
        );
      }
    );
  }

  Widget _buildInfoItem(BuildContext context,Widget icon, String label, String value) {
    return Column(
      children: [
        icon,
        SizedBox(height: 1.vmin),
        Text(
          label,
          style: TextStyle(fontSize: 14.sp, color: Colors.grey),
        ),
        Text(
          value,
          style: TextStyle(fontSize: 15.sp, fontWeight: FontWeight.bold),
        ),
      ],
    );
  }

  Widget _buildPersonalInfo(EmployeeModel employee) {
    final user = employee.user;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Personal Information'.tr,
          style: TextStyle(
            fontSize: 19.sp,
            fontWeight: FontWeight.w700,
            color: AppColors.textPrimary,
          ),
        ),
        SizedBox(height: 2.vmin),
        Container(
          width: double.infinity,
          padding: EdgeInsets.all(4.vmin),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: Colors.grey.shade200),
          ),
          child: Column(
            children: [
              _buildInfoRow('Full Name'.tr, user?.fullName ?? ''),
              _buildDivider(),
              _buildInfoRow('Phone'.tr, user?.phone ?? ''),
              _buildDivider(),
              _buildInfoRow('Gender'.tr, _capitalize(user?.gender)),
              _buildDivider(),
              _buildInfoRow('Birth Date'.tr, _formatDate(user?.birth)),
              _buildDivider(),
              _buildInfoRow('Address'.tr, user?.address ?? ''),
              _buildDivider(),
              _buildInfoRow('Role'.tr, (user?.roles ?? []).join(', ')),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(fontSize: 14.sp, color: Colors.grey),
        ),
        const Spacer(),
        Flexible(
          child: Text(
            value.isEmpty ? 'N/A'.tr : value,
            textAlign: TextAlign.right,
            style: TextStyle(
              fontSize: 14.sp,
              fontWeight: FontWeight.w600,
              color: AppColors.textPrimary,
            ),
          ),
        ),
      ],
    );
  }

Widget _buildDivider() {
    return Divider(height: 4.vmin, color: Colors.transparent);
  }

  String _formatDate(String? value) {
    if (value == null || value.isEmpty) return '';
    return value.split('T').first;
  }

  String _capitalize(String? value) {
    if (value == null || value.isEmpty) return '';
    return value[0].toUpperCase() + value.substring(1);
  }

  Widget _buildSection(String title, String content) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: TextStyle(
            fontSize: 19.sp,
            fontWeight: FontWeight.w700,
            color: AppColors.textPrimary,
          ),
        ),
        SizedBox(height: 2.vmin),
        Container(
          width: double.infinity,
          padding: EdgeInsets.all(4.vmin),
          decoration: BoxDecoration(
            color: Colors.grey.shade50,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: Colors.grey.shade200),
          ),
          child: Text(
            content,
            style: TextStyle(
              fontSize: 15.sp,
              color: AppColors.textSecondary,
              height: 1.4,
            ),
          ),
        ),
      ],
    );
  }

 
  

  
}
