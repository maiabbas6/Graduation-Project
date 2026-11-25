

part 'data_status.dart';


class DataState<T> {

  final T? data;
  final Object? exception;
  final DataStatus status;

  const DataState({
    this.data,
    this.exception,
    this.status = DataStatus.init
  });

  @override
  String toString() {
    return """DataState<$T>
status : $status
data : $data
message : $exception    
""";
  }


  B? fold<B>(B Function(Object e) fail,B Function(T data) success){
    if(status.isError){
      return fail(exception!);
    }else if(status.isSuccess){
      return success(data as T);
    }
    return null;
  }

}