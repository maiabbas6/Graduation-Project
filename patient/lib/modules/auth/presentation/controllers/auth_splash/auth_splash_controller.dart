import 'package:get/get.dart';

import '../../../../../core/base_controllers/load_data_controller.dart';
import '../../../../../core/errors/exeptions.dart';
import '../../../../../core/storage/storage_handler.dart';
import '../../../../appointments/presentation/screens/home_screen.dart';
import '../../../data/data_sources/auth_data_source.dart';
import '../../screens/auth_login_screen.dart';

class AuthSplashController extends LoadDataController<String> {
  @override
  void onReady() {
    if (!StorageHandler().hasToken) {
      Get.offAllNamed(AuthLoginScreen.name);
      return;
    }
    loadData();
  }

  @override
  Future<String> callApi() => AuthDataSource.checkAuth();

  @override
  void onSuccess(String data) {
    Get.put(data,tag: 'user-name',permanent: true);
    Get.offAllNamed(HomeScreen.route);
  }

  @override
  void onFail(Object exception) {
    if (exception is ServerException && exception.errorMessageModel.code == 401) {
      StorageHandler().removeToken();
      Get.offAllNamed(AuthLoginScreen.name);
    }
  }

}
