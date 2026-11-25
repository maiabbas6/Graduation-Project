import 'dart:async';

import 'package:get/get.dart';

import '../data_state/data_state.dart';


abstract class BaseController<T> extends GetxController {

  DataState<T> dataState = DataState<T>(
      status: DataStatus.init
  );

  final List<Worker> workers = [];

  DataStatus get status => dataState.status;

  T get data => dataState.data!;
  DataState<T> get state => dataState;

  Future<T> callApi();

  void onFail(Object exception){}

  void onSuccess(T data){}

  @override
  void onClose() {
    print('workers " $workers');
    for (var w in workers) {
      w.dispose();
    }
    super.onClose();
  }

  void worker<S>(RxInterface<S> listener,Function(S) callback){
    workers.add(ever(listener,callback));
  }
}