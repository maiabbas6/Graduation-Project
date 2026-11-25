import 'dart:async';
import 'package:flutter/foundation.dart';
import 'package:get/get.dart';


import '../data_state/data_state.dart';

Future<DataState<T>> handle<T>(FutureOr<T> Function() process) async {
  try {
    var result = await process();
    return DataState<T>(data: result, status: DataStatus.success);
  }  catch (e,s) {
    if (kDebugMode) {
      e.printError();
      print('Handler Message :\n -----$e-----\n');
      print(s);

    }

    return DataState(status: DataStatus.error, exception: e);
  }
}
