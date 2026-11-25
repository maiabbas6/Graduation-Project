import 'package:get_storage/get_storage.dart';

const String appName = 'patient';

class StorageHandler {
  late final GetStorage _storage = GetStorage(appName);

  static Future<void> init() async {
    await GetStorage.init(appName);
  }

  static StorageHandler? _instance;

  StorageHandler._();

  factory StorageHandler() => _instance ??= StorageHandler._();

  Future<void> setToken(String token) =>
      _storage.write('token', token);

  


  Future<void> removeToken() => _storage.remove('token');

  bool get hasToken => _storage.hasData('token');

  bool get hasLanguage => _storage.hasData('language');

  String get token =>
      hasToken ? _storage.read('token') : 'no token';

  Future<void> setRefreshToken(String token) =>
      _storage.write('refresh_token', token);



  Future<void> removeRefreshToken() => _storage.remove('refresh_token');

  bool get hasRefreshToken => _storage.hasData('refresh_token');


  String get refreshToken =>
      hasToken ? _storage.read('refresh_token') : 'no token';



  String get language =>
      hasLanguage ? _storage.read('language') : 'en';

   Future<void> setLanguage(String language) =>
      _storage.write('language', language);


}
