import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:patient/core/utils/file_picker_helper.dart';
import 'package:patient/modules/appointments/data/models/employee_model.dart';
import 'package:patient/modules/appointments/presentation/screens/appointment_list_screen.dart';
import '../../../../../core/base_controllers/send_data_controller.dart';
import '../../../data/data_sources/appointment_data_source.dart';
import '../../../data/models/appointment_model.dart';
import '../../../data/models/section_model.dart';

class CreateAppointmentController extends SendDataController<dynamic> {
  final descriptionController = TextEditingController();
  final Rxn<DateTime> selectedDateTime = Rxn<DateTime>();
  
  final Rxn<AppointmentType> selectedType = Rxn<AppointmentType>();
  final Rxn<SectionModel> selectedSection = Rxn<SectionModel>();
  final Rxn<EmployeeModel> selectedDoctor = Rxn<EmployeeModel>();
  final RxList<String> selectedFiles = <String>[].obs;
  
  @override
  bool get withSnackBar => true;
  

  Future<void> pickImages() async {
    final paths = await FilePickerHelper.getImages();
    if (paths != null && paths.isNotEmpty) {
      selectedFiles.addAll(paths);
    }
  }

  Future<void> pickPdfs() async {
    final paths = await FilePickerHelper.getPdfs();
    if (paths != null && paths.isNotEmpty) {
      selectedFiles.addAll(paths);
    }
  }

  void removeFile(String path) {
    selectedFiles.remove(path);
  }

  @override
  Future<dynamic> callApi() {
    return AppointmentDataSource.createAppointment(
      employeeId: selectedDoctor.value!.id,
      appointmentDateTime: selectedDateTime.value!,
      description: descriptionController.text,
      type: selectedType.value!,
      attatchments: selectedFiles.toList(),
    );
  }

  @override
  void onSuccess(dynamic data) {
    Get.offAllNamed(AppointmentListScreen.route);
  }

  

  @override
  void onClose() {
    super.onClose();
    selectedFiles.close();
    selectedSection.close();
    selectedDoctor.close();
    selectedType.close();
  }
}
