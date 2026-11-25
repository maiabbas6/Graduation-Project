import '../network/network_helper.dart';

class ErrorMessageModel {
  final String statusMessage;
  final int code;
  final Map<String,dynamic>?json ;
  const ErrorMessageModel({
    required this.statusMessage,
    required this.code,
    this.json,
  });

  factory ErrorMessageModel.fromJson(Map<String, dynamic> json) {
    return ErrorMessageModel(
      statusMessage: json['message'] ?? '',
      code: json['code'] ?? 500,
      json: json,
    );
  }

  factory ErrorMessageModel.fromResponse(AppResponse response) {
    return ErrorMessageModel(
      statusMessage:response.data?['message'] ?? '',
      code: response.statusCode,
    );
  }

}
