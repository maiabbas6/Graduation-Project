part of './state_component.dart';


class ControllerComponent<T,C extends BaseController> extends GetView<C> {
  const ControllerComponent({
    super.key,
    required this.onSuccess,
    this.onError,
    this.onLoading,
    this.onInit,
    this.state,
    this.tag
  });

  final DataState<T> Function()? state;
  @override
  final String? tag;
  final Widget Function(BuildContext context,String message)? onError;
  final Widget Function(BuildContext context,T data) onSuccess;
  final WidgetBuilder? onLoading;
  final WidgetBuilder? onInit;

  @override
  Widget build(BuildContext context) {
    return GetBuilder<C>(
        tag: tag,
        builder: (_) => StatusComponent<T>(
            state:state?.call() ?? (controller.state as DataState<T>),
            onSuccess: onSuccess,
            onError: onError,
            onInit: onInit,
            onLoading: onLoading,
        )
    );
  }

  static Widget sliver<T,C extends BaseController>({
    DataState<T> Function()? state,
    String? tag,
    Widget Function(BuildContext context,String message)?onError,
    required Widget Function(BuildContext context,T data) onSuccess,
    WidgetBuilder?onLoading,
    WidgetBuilder?onInit,
}) {

    return GetBuilder<C>(
        tag: tag,
        builder: (_) {
          return StatusComponent<T>.sliver(
            state: state?.call() ?? Get.find<C>().state as DataState<T>,
            onSuccess: onSuccess,
            onError: onError,
            onInit: onInit,
            onLoading: onLoading,
          );
        }
    );
  }
}
