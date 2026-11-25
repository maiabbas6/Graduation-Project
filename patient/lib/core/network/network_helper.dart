import 'package:flutter/foundation.dart';

import 'cache_network_helper.dart';
part 'app_response.dart';

abstract class NetworkHelper {
  factory NetworkHelper() => CacheNetworkHelper();
  NetworkHelper.create();

  Future<AppResponse> get(String url, {Map<String, String>? headers});

  Future<AppResponse> post(String url,
      {Map<String, String>? headers,
      Map<String, dynamic>? body,
      Map<String, String>? files});

  Future<AppResponse> put(String url,
      {Map<String, String>? headers,
      Map<String, dynamic>? body,
      Map<String, String>? files});

  Future<AppResponse> patch(String url,
      {Map<String, String>? headers,
      Map<String, dynamic>? body,
      Map<String, String>? files});

  Future<AppResponse> delete(
      String url,
      {
        Map<String, String>? headers,
        Map<String, dynamic>? body
      });



}