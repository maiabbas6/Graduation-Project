
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../base_controllers/base_controller.dart';
import '../../data_state/data_state.dart';
import '../app_loader.dart';
part './controller_component.dart';



class StatusComponent<T> extends StatelessWidget {

  final DataState<T> state;
  final Widget Function(BuildContext context,String message)? onError;
  final Widget Function(BuildContext context,T data) onSuccess;
  final WidgetBuilder? onLoading;
  final WidgetBuilder? onInit;


  const StatusComponent({
    super.key,
    required this.state,
    required this.onSuccess,
    this.onError,
    this.onLoading,
    this.onInit
  });

  @override
  Widget build(BuildContext context) {
    switch(state.status){
      case DataStatus.error:
        return onError?.call(context,state.exception.toString()) ?? Center(
          child: Text(state.exception.toString()),
        );
      case DataStatus.success:
        return onSuccess(context,state.data!);
      case DataStatus.init:
        return onInit?.call(context) ?? const Center(
          child: AppLoader(),
        );
      case DataStatus.loading:
        return onLoading?.call(context) ?? const Center(
          child: AppLoader(),
        );
    }
  }

  factory StatusComponent.sliver({
    Key? key,
    required DataState<T> state,
    Widget Function(BuildContext context,String message)?onError,
    required Widget Function(BuildContext context,T data) onSuccess,
    WidgetBuilder?onLoading,
    WidgetBuilder?onInit,
  }) => StatusComponent(
      key: key,
      state: state,
      onSuccess: onSuccess,
      onError: onError ?? (_,message) => SliverToBoxAdapter(
        child: Text(message),
      ),
      onLoading: onLoading ?? (_) => const SliverToBoxAdapter(
        child: Center(
          child: AppLoader(),
        )
      ),
      onInit: onInit ?? (_) => const SliverToBoxAdapter(
        child: Center(
          child: AppLoader(),
        )
      ),
  );
}