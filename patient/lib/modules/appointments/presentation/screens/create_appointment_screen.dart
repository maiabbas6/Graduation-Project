import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:get/get.dart';
import 'package:patient/core/utils/string_utils.dart';
import 'package:patient/modules/appointments/data/models/appointment_model.dart';
import 'package:patient/modules/appointments/presentation/components/employee_view.dart';
import 'package:patient/modules/appointments/presentation/screens/employee_details_screen.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import '../../../../core/constants/color_const.dart';
import '../../../../core/core_components/app_scaffold.dart';
import '../../../../core/core_components/app_text_form_field.dart';
import '../../../../core/core_components/app_button.dart';
import '../../../../core/core_components/app_selector_field.dart';
import '../../../../core/utils/app_validator.dart';
import '../../data/models/section_model.dart';
import '../controllers/create_appointment/create_appointment_controller.dart';
import '../controllers/create_appointment/create_appointment_binding.dart';
import 'select_section_screen.dart';

class CreateAppointmentScreen extends GetView<CreateAppointmentController> {
  static const route = '/create-appointment';

  static GetPage page = GetPage(
    name: route,
    page: () => const CreateAppointmentScreen(),
    binding: CreateAppointmentBinding(),
  );

  const CreateAppointmentScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      appBar: AppBar(title: const Text('Create Appointment')),
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Form(
                key: controller.formKey,
                child: Column(
                  children: [
                    Obx(
                      () => controller.selectedDoctor.value != null ? 
                        EmployeeView(employee: controller.selectedDoctor.value!):SizedBox()
                      ,
                    ),
                    // Appointment Type
                    Obx(
                      () => AppSelectorField<AppointmentType>(
                        title:
                            controller.selectedType.value?.toString() ?? 'Type',
                        onTap: () => _showSelectTypeSheet(context),
                      ),
                    ),
                    SizedBox(height: 2.5.vmin),
                    // DateTime
                    Obx(
                      () => AppSelectorField<DateTime>(
                        title:
                            controller
                                .selectedDateTime
                                .value
                                ?.formattedDateTime ??
                            'Appointment Date Time',
                            onTap: () => controller.selectedDoctor.value != null ?
                             EmployeeDetailsScreen.navigate(controller.selectedDoctor.value!.id):
                             null,
                      ),
                    ),
                    SizedBox(height: 2.5.vmin),

                    
                    
                    // DoctorPicker
                    Obx(
                      () => AppSelectorField<SectionModel>(
                        title:
                            controller.selectedSection.value?.name ?? 'Section',
                          onTap: () => SelectSectionScreen.navigate(
                          controller.selectedSection,
                        ),
                        prefixIcon: controller.selectedSection.value != null
                            ? SvgPicture.network(
                                controller.selectedSection.value!.icon,
                              )
                            : null,
                      ),
                    ),
                    SizedBox(height: 2.5.vmin),

                    AppTextFormField(
                      controller: controller.descriptionController,
                      hint: 'Description',
                      maxLines: 2,
                      validator: AppValidator.requiredStringLength,
                    ),

                    SizedBox(height: 2.5.vmin),
                    _buildFilesSection(),

                    SizedBox(height: 5.vmin),
                    AppButton(title: 'Create', onTap: controller.sendData),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFilesSection() {
    return Obx(
      () {
        final files = controller.selectedFiles;
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                TextButton.icon(
                  onPressed: () => controller.pickImages(),
                  icon: const Icon(Icons.image_outlined),
                  label: const Text('Add Images'),
                ),
                SizedBox(width: 2.vmin),
                TextButton.icon(
                  onPressed: () => controller.pickPdfs(),
                  icon: const Icon(Icons.picture_as_pdf_outlined),
                  label: const Text('Add PDFs'),
                ),
              ],
            ),
            if (files.isNotEmpty)
              SizedBox(
                height: 24.vmin,
                child: ListView.separated(
                  scrollDirection: Axis.horizontal,
                  itemCount: files.length,
                  separatorBuilder: (context, index) =>
                      SizedBox(width: 2.vmin),
                  itemBuilder: (context, index) =>
                      _buildFileItem(files[index]),
                ),
              ),
          ],
        );
      },
    );
  }

  Widget _buildFileItem(String path) {
    return SizedBox(
      width: 22.vmin,
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          Container(
            width: double.infinity,
            height: double.infinity,
            clipBehavior: Clip.antiAlias,
            decoration: BoxDecoration(
              color: AppColors.surface,
              borderRadius: BorderRadius.circular(2.vmin),
              border: Border.all(color: AppColors.border),
            ),
            child: _isImage(path)
                ? Image.file(File(path), fit: BoxFit.cover)
                : Padding(
                    padding: EdgeInsets.all(2.vmin),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.insert_drive_file_outlined,
                          size: 22.sp,
                          color: AppColors.primary,
                        ),
                        SizedBox(height: 1.vmin),
                        Text(
                          _fileName(path),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: 12.sp,
                            color: AppColors.textSecondary,
                          ),
                        ),
                      ],
                    ),
                  ),
          ),
          Positioned(
            top: -1.2.vmin,
            right: -1.2.vmin,
            child: GestureDetector(
              onTap: () => controller.removeFile(path),
              child: Container(
                padding: EdgeInsets.all(0.8.vmin),
                decoration: const BoxDecoration(
                  color: AppColors.error,
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  Icons.close,
                  size: 10.sp,
                  color: AppColors.textLight,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  bool _isImage(String path) {
    final extension = path.split('.').last.toLowerCase();
    return const [
      'jpg',
      'jpeg',
      'png',
      'gif',
      'webp',
      'bmp',
      'heic',
      'heif',
    ].contains(extension);
  }

  String _fileName(String path) {
    final parts = path.split(RegExp(r'[/\\]'));
    return parts.isNotEmpty ? parts.last : path;
  }

  void _showSelectTypeSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      builder: (_) => Column(
        mainAxisSize: MainAxisSize.min,
        children: AppointmentType.values.map((type) {
          final name = type.name
              .split(RegExp(r'(?=[A-Z])'))
              .map((s) => s.capitalizeFirst)
              .join(' ');
          return ListTile(
            title: Text(name),
            trailing: controller.selectedType.value == type
                ? const Icon(Icons.check)
                : null,
            onTap: () {
              controller.selectedType.value = type;
              Get.back();
            },
          );
        }).toList(),
      ),
    );
  }
}
