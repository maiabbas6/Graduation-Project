
import 'package:intl/intl.dart';

extension StringUtils on String {

  String get normalized => replaceAll(' ', '');

}

extension DateUtils on DateTime {

  String get formattedDate => DateFormat('yyyy-MM-dd').format(this);

  String get formattedDateTime => DateFormat('yyyy-MM-dd HH:mm a').format(this);

  DateTime? addTimeString(String time){
    return DateTime.tryParse("${DateFormat('yyyy-MM-dd').format(this)} $time");
  } 

}