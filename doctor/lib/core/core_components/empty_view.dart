import 'package:flutter/material.dart';
import 'package:get/get.dart';

class EmptyView extends StatelessWidget {
  const EmptyView({
    super.key,
    required this.onNotEmpty,
    required this.isEmpty,
    this.onEmpty,
    this.isSliver = false,
  });

  final WidgetBuilder onNotEmpty;
  final bool isEmpty;
  final WidgetBuilder? onEmpty;
  final bool isSliver;

  @override
  Widget build(BuildContext context) {
    if (!isEmpty) {
      return onNotEmpty(context);
    }

    final content = onEmpty?.call(context) ?? Text("Empty!".tr);

    if (isSliver) {
      return content;
    }

    return Center(
      child: content,
    );
  }

  factory EmptyView.sliver({
    Key? key,
    required WidgetBuilder onNotEmpty,
    required bool isEmpty,
    WidgetBuilder? onEmpty,
  }) =>
      EmptyView(
        onNotEmpty: onNotEmpty,
        isEmpty: isEmpty,
        key: key,
        isSliver: true,
        onEmpty: onEmpty ??
            (_) => SliverToBoxAdapter(
                  child: Center(
                    child: Text("Empty!".tr),
                  ),
                ),
      );
}
