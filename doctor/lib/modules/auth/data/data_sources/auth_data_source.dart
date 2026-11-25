import '../../../../core/constants/api_const.dart';
import '../../../../core/network/network_helper.dart';
import '../../../../core/storage/storage_handler.dart';

class AuthDataSource {
  
  static Future<String> checkAuth() async {
    var user = await NetworkHelper().get(ApiConst.profile);
    return user.data['data']['first_name'];
  }

  static Future<String> login({
    required String phone,
    required String password,
  }) async {
    
    var response = await NetworkHelper().post(
      ApiConst.login,
      body: {
        'phone': phone,
        'password': password,
      },
    );
    var token = response.data['data']['token'] as String;
    await StorageHandler().setToken(token);
    return response.data['data']['user']['first_name'];
  }
}
