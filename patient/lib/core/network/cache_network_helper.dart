
import 'dio_network_helper.dart';
import 'network_helper.dart';

class CacheNetworkHelper extends NetworkHelper{

  CacheNetworkHelper._() : super.create();
  static CacheNetworkHelper? _instance;
  factory CacheNetworkHelper() => _instance ??= CacheNetworkHelper._();

  NetworkHelper get _networkHelper => DioNetworkHelper();

  static const int cacheTime = 65; // sec

  Map<String, _CacheAppResponse> _cache = {};

  @override
  Future<AppResponse> get(String url, {Map<String, String>? headers}) async {
    if(_cache.containsKey(url)){
      var cacheResponse = _cache[url];
      if(cacheResponse?.fetchedAt.isAfter(DateTime.now().subtract(Duration(seconds: cacheTime))) ?? false){
        return cacheResponse!.response;
      }
    }
    var response = await _networkHelper.get(url, headers: headers);
    _cache[url] = _CacheAppResponse(response: response);
    return response;
  }

  @override
  Future<AppResponse> post(String url, {Map<String, String>? headers, Map<String, dynamic>? body, Map<String, String>? files}) {
     _cache.clear();
     return _networkHelper.post(url, headers: headers, body: body, files: files);
  }

  @override
  Future<AppResponse> put(String url, {Map<String, String>? headers, Map<String, dynamic>? body, Map<String, String>? files}) {
    _cache.clear();
    return _networkHelper.put(url, headers: headers, body: body, files: files);
  }
  
  @override
  Future<AppResponse> patch(String url, {Map<String, String>? headers, Map<String, dynamic>? body, Map<String, String>? files}) {
    _cache.clear();
    return _networkHelper.patch(url, headers: headers, body: body, files: files);
  }
  
  @override
  Future<AppResponse> delete(String url, {Map<String, String>? headers, Map<String, dynamic>? body}) {
    _cache.clear();
    return _networkHelper.delete(url, headers: headers, body: body);
  }
  
  void reset() =>
    _cache.clear();
  
}

class _CacheAppResponse  {
    final DateTime fetchedAt = DateTime.now();
    final AppResponse response;

    _CacheAppResponse({
        required this.response,
    });

}