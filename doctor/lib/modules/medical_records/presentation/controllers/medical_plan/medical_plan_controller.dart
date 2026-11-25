import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../data/data_sources/medical_record_data_source.dart';
import '../../../data/models/medical_record_detail_model.dart';

class MedicalPlanController extends GetxController {
  final int medicalRecordId;

  MedicalPlanController(this.medicalRecordId);

  final record = Rx<MedicalRecordDetailModel?>(null);
  final isLoading = true.obs;
  final isSubmitting = false.obs;
  final titleController = TextEditingController();
  final descriptionController = TextEditingController();

  @override
  void onReady() {
    super.onReady();
    loadRecord();
  }

  Future<void> loadRecord() async {
    isLoading.value = true;
    try {
      record.value = await MedicalRecordDataSource.getMedicalRecord(medicalRecordId);
    } catch (e) {
      Get.snackbar('Error'.tr, 'Failed to load medical record'.tr);
    } finally {
      isLoading.value = false;
    }
  }

  Future<void> submitPlan() async {
    final title = titleController.text.trim();
    final description = descriptionController.text.trim();
    if (title.isEmpty || description.isEmpty) {
      Get.snackbar('Error'.tr, 'Please fill all fields'.tr);
      return;
    }

    isSubmitting.value = true;
    try {
      await MedicalRecordDataSource.addMedicalPlan(
        medicalRecordId: medicalRecordId,
        title: title,
        description: description,
      );
      titleController.clear();
      descriptionController.clear();
      Get.snackbar('Success'.tr, 'Medical plan added successfully'.tr,
          backgroundColor: Get.theme.colorScheme.primary,
          colorText: Get.theme.colorScheme.onPrimary);
      await loadRecord();
    } catch (e) {
      Get.snackbar('Error'.tr, 'Failed to add medical plan'.tr);
    } finally {
      isSubmitting.value = false;
    }
  }

  @override
  void onClose() {
    titleController.dispose();
    descriptionController.dispose();
    super.onClose();
  }
}
