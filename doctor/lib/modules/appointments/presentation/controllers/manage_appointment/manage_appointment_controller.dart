import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../data/data_sources/appointment_data_source.dart';
import '../../../data/models/appointment_model.dart';

class ManageAppointmentController extends GetxController {
  final AppointmentModel appointment;

  ManageAppointmentController(this.appointment);

  final medicalRecordType = 'lab'.obs;
  final descriptionController = TextEditingController();
  final isLoading = false.obs;

  static const medicalRecordTypes = ['lab', 'radiology', 'treatment'];

  Future<void> closeAppointment() async {
    if (descriptionController.text.trim().isEmpty) {
      Get.snackbar('Error'.tr, 'Please enter a description'.tr);
      return;
    }

    isLoading.value = true;
    try {
      await AppointmentDataSource.closeAppointment(
        appointmentId: appointment.id,
        medicalRecordType: medicalRecordType.value,
        medicalRecordDescription: descriptionController.text.trim(),
      );
      Get.back(result: true);
      Get.snackbar('Success'.tr, 'Appointment closed successfully'.tr,
          backgroundColor: Get.theme.colorScheme.primary, colorText: Colors.white);
    } catch (e) {
      Get.snackbar('Error'.tr, 'Failed to close appointment: $e'.tr,
          backgroundColor: Get.theme.colorScheme.error, colorText: Colors.white);
    } finally {
      isLoading.value = false;
    }
  }

  @override
  void onClose() {
    descriptionController.dispose();
    super.onClose();
  }
}
