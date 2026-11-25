import 'package:flutter/cupertino.dart';
import 'package:get/get.dart';
import 'base_controller.dart';

import '../core_components/pop_up.dart';
import '../data_state/data_state.dart';
import '../errors/handler.dart';

abstract class SendDataController<T> extends BaseController<T> {


  
  final formKey = GlobalKey<FormState>();

  final bool withLoader = true;
  final bool withSnackBar = false;

  void sendData() async {
    if (!validate()) return;
    dataState = DataState<T>(status: DataStatus.loading);
    if (withLoader) showLoader();
    update();
    dataState = await handle<T>(callApi);
    dataState.fold(onFail, onSuccess);
    if (withLoader) Get.back();
    update();
  }

  @override
  void onFail(Object exception) {
    if(withSnackBar) {
      showSnackBar(exception.toString());
    }
  }


  bool validate() => formKey.currentState?.validate() ?? true;



}
