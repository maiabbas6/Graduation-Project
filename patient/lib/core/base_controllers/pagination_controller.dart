
import 'dart:async';
import 'dart:developer';
import 'package:async/async.dart';
import 'package:flutter/cupertino.dart';
import 'load_data_controller.dart';

import '../data_state/data_state.dart';
import '../errors/handler.dart';
abstract class PaginationController<T> extends LoadDataController<List<T>>{
  int _page = 1;

  Future<List<T>> paginationCallApi(int page);

  @override
  Future<List<T>> callApi() =>
      paginationCallApi(_page++);

  bool _lock = false;
  DataState<List<T>> _moreState = DataState<List<T>>();
  DataState<List<T>> get moreState => _moreState;

  void loadMore() async{
    if(_moreState.status.isSuccess || _lock){
      return;
    }
    _lock = true;
    _moreState = DataState<List<T>>(
        status: DataStatus.loading
    );

    _moreState = await handle(callApi);

    _moreState.fold(
            (failState) => _page --,
            (successState){
          if(_moreState.data!.isEmpty){
            return;
          }
          data.addAll(_moreState.data!);
          _moreState = DataState<List<T>>(
              status: DataStatus.loading
          );
        }
    );
    _lock = false;
    update();
  }

  final scrollController = ScrollController();

  void _scrollEvent() async {
    //_pos = scrollController.offset;
    if (scrollController.position.pixels >=
        (scrollController.position.maxScrollExtent - 50)) {
      bool isTop = scrollController.position.pixels == 0;
      if (/*!isTop &&*/ !_lock) {
        loadMore();
      }
    }
  }

  @override
  void onInit() {
    super.onInit();
    scrollController.addListener(_scrollEvent);
  }

  @override
  void onClose() {
    super.onClose();
    scrollController.removeListener(_scrollEvent);
    scrollController.dispose();

  }




  @override
  Future<void> loadData() async{
    _page = 1;
    return super.loadData();
  }

  @override
  void onSuccess(List<T> data) {
    super.onSuccess(data);
    _scrollEvent();
    if(data.isEmpty){
      _moreState = state;
    }
  }

  @override
  void onFail(Object exception) {
    _moreState = state;
  }




}