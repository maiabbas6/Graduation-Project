import 'dart:math';

import 'package:flutter/material.dart';




class AppScaffold extends StatelessWidget {
  const AppScaffold({super.key, this.appBar, this.body, this.bottomNavigationBar, this.backgroundColor, this.extendBodyBehindAppBar = false, this.extendBody = true, this.floatingActionButton});

  final PreferredSizeWidget? appBar;
  final Widget? body;
  final Widget? bottomNavigationBar;
  final Color? backgroundColor;
  final bool extendBodyBehindAppBar;
  final bool extendBody;
  final Widget? floatingActionButton;

  @override
  Widget build(BuildContext context) {
    
    return Scaffold(
      floatingActionButton: floatingActionButton,
      backgroundColor:backgroundColor,
      extendBody: extendBody,
      extendBodyBehindAppBar: extendBodyBehindAppBar,
      appBar: appBar,
      bottomNavigationBar: bottomNavigationBar,
      body: SizedBox(
        height: double.infinity,
        width: double.infinity,
        child: body,
      ),
    );
  }
}
