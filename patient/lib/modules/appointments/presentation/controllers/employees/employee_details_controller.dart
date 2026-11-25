import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:patient/core/core_components/pop_up.dart';
import 'package:patient/core/errors/handler.dart';
import 'package:patient/core/utils/string_utils.dart';
import 'package:patient/modules/appointments/presentation/controllers/create_appointment/create_appointment_controller.dart';
import 'package:patient/modules/appointments/presentation/screens/create_appointment_screen.dart';
import '../../../../../core/base_controllers/load_data_controller.dart';
import '../../../data/data_sources/employees_data_source.dart';
import '../../../data/models/employee_model.dart';

class EmployeeDetailsController extends LoadDataController<EmployeeModel> {
  final int employeeId;

  EmployeeDetailsController(this.employeeId);

  @override
  Future<EmployeeModel> callApi() =>
      EmployeesDataSource.getEmployeeById(employeeId);

  

  Function()? get selectDay {
    try {
      final createController = Get.find<CreateAppointmentController>();
      int _toCarbonDay(DateTime date) {
        return date.weekday == DateTime.sunday ? 0 : date.weekday;
      }

      bool _isScheduledDay(DateTime date, Set<int> carbonDays) {
        return carbonDays.contains(_toCarbonDay(date));
      }

      DateTime _firstAvailableDate(DateTime now, Set<int> carbonDays) {
        var date = now;
        for (var i = 0; i < 7; i++) {
          if (_isScheduledDay(date, carbonDays)) return date;
          date = date.add(const Duration(days: 1));
        }
        return now;
      }

      return () async {
        final carbonDays = data.schedules.map((s) => s.day).toSet();
        final now = DateTime.now();
        final picked = await showDatePicker(
          context: Get.context!,
          initialDate: _firstAvailableDate(now, carbonDays),
          firstDate: now,
          lastDate: DateTime(now.year + 1, now.month, now.day),
          selectableDayPredicate: (date) => _isScheduledDay(date, carbonDays),
          helpText: 'Select Appointment Day',
        );
        if(picked == null) return;
        showLoader();
        var available = await handle(()=>EmployeesDataSource.getEmployeeSchedualsTimesById(employeeId,picked!));
        Get.back();
        available.fold((_){},(data){

          showModalBottomSheet(context: Get.context!, builder: (_)=>
            ListView.separated(
              separatorBuilder: (_,__)=> const Divider(),
              itemCount: data.length,
              itemBuilder: (_,i)=>
                ListTile(
                  title: Text(data[i]),
                  leading: Icon(Icons.access_time),
                  onTap: (){
                    createController.selectedDateTime(picked.addTimeString(data[i]));
                    createController.selectedDoctor(this.data);
                    Get.until((route) => route.settings.name == CreateAppointmentScreen.route);
                  },
                )
              ,
            )
          );
          
        });


      };
    } catch (e) {
      return null;
    }
  }
}
