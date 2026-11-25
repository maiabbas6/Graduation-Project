import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:patient/core/core_components/theme/app_theme.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import 'core/pages/app_pages.dart';
import 'core/storage/storage_handler.dart';
import 'core/translation/app_translation.dart';
import 'modules/auth/presentation/screens/auth_splash_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await StorageHandler.init();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    final storedLanguage = StorageHandler().language;
    final initialLocale = storedLanguage == 'ar' ? const Locale('ar', 'SY') : const Locale('en', 'US');

    return ResponsiveSizer(
      builder: (_,__,___)=>GetMaterialApp(
        title: 'Patient',
        debugShowCheckedModeBanner: false,
        initialRoute: AuthSplashScreen.name,
        getPages: AppPages.pages,
        theme: AppTheme.theme,
        translations: AppTranslation(),
        locale: initialLocale,
        fallbackLocale: const Locale('en', 'US'),
      ),
    );
  }
}
