import '../../../../../core/base_controllers/load_data_controller.dart';
import '../../../data/data_sources/profile_data_source.dart';
import '../../../data/models/profile_model.dart';

class ProfileController extends LoadDataController<ProfileModel> {
  @override
  Future<ProfileModel> callApi() => ProfileDataSource.fetchProfile();
}
