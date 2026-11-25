import 'package:get/get.dart';

import '../../../../../core/storage/storage_handler.dart';
import '../../../../../core/base_controllers/load_data_controller.dart';
import '../../../../auth/presentation/screens/auth_login_screen.dart';
import '../../../data/data_sources/profile_data_source.dart';
import '../../../data/models/profile_model.dart';

class ProfileController extends LoadDataController<ProfileModel> {
  @override
  Future<ProfileModel> callApi() => ProfileDataSource.fetchProfile();

  Future<void> logout() async {
    await StorageHandler().removeToken();
    await StorageHandler().removeRefreshToken();
    Get.offAllNamed(AuthLoginScreen.name);
  }
}
