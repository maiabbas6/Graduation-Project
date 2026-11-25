import 'dart:async';

import 'package:get/get.dart';
import 'base_controller.dart';

import '../data_state/data_state.dart';
import '../errors/handler.dart';


abstract class LoadDataController<T> extends BaseController<T> {


  Future<void> loadData() async{
    dataState = DataState<T>(
        status: DataStatus.loading
    );
    update();
    dataState = await handle<T>(callApi);
    dataState.fold(onFail,onSuccess);
    update();
  }


  @override
  void onReady() {
    super.onReady();
    
    loadData();
  }



}