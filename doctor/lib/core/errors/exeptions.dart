import 'error_message_model.dart';

abstract class BaseException implements Exception{
  String get message;
  const BaseException();
  @override
  String toString() => message;
}

class ServerException extends BaseException {
  final ErrorMessageModel errorMessageModel;
  const ServerException(this.errorMessageModel);

  @override
  String get message => errorMessageModel.statusMessage;
}

class ConnectionError extends BaseException {
  const ConnectionError();

   @override
   String get message => "No Internet";
}

class UnAuthorizedException extends ServerException {
  const UnAuthorizedException(super.errorMessageModel);
}