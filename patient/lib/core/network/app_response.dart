
part of 'network_helper.dart';

class AppResponse {

  final dynamic data;
  final int statusCode;
  final Map<String,String>? headers;
  final DateTime fetchedAt = DateTime.now();

  AppResponse({
    this.data,
    required this.statusCode,
    this.headers
  }){
    if(kDebugMode){
      print('response :\n $data \n');
    }
  }

}