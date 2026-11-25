import '../../../../core/constants/api_const.dart';
import '../../../../core/network/network_helper.dart';
import '../models/profile_model.dart';

class ProfileDataSource {
  static Future<ProfileModel> fetchProfile() async {
    var response = await NetworkHelper().get(ApiConst.profile);
    return ProfileModel.fromJson(response.data['data']);
  }
}
