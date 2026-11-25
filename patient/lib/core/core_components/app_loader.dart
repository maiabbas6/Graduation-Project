
import 'package:flutter/material.dart';


class AppLoader extends StatelessWidget {
  const AppLoader({super.key, this.width});
  final double? width;

  @override
  Widget build(BuildContext context) {
    return Center(child: CircularProgressIndicator());
  }

  // @override
  // Widget build(BuildContext context) {
  //   return LottieBuilder.asset(
  //     AppLottie.loader,
  //     frameRate: FrameRate.max,
  //     filterQuality: FilterQuality.high,
  //     fit: BoxFit.scaleDown,
  //     width: width ?? ScreenDimensions.widthPercentage(context, 15),
  //   );
  // }
}
