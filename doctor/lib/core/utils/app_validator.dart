import 'package:get/get.dart';
import 'string_utils.dart';


class AppValidator {

  static const phoneRequired = 'Phone Number is required';
  static const phoneNotValid = 'Phone Number is not valid';
  static const numberNotValid = 'must be a valid number';
  static const invalidBirth = 'invalid birth day';
  static const birthRequired = 'birth day is required';
  static const required = 'required';
  static const requiredLength = 'must be at least X character';

  static final List<RegExp> _phoneRegex = [
    RegExp(r'^093\d{7}$'),
    RegExp(r'^094\d{7}$'),
    RegExp(r'^095\d{7}$'),
    RegExp(r'^096\d{7}$'),
    RegExp(r'^098\d{7}$'),
    RegExp(r'^099\d{7}$'),
  ];


  static String? requiredStringLength(String? value,[int len = 2]){
    if(value == null || value.trim().length < len) return requiredLength.tr.replaceAll("X", len.toString());
    return null;
  }

  static String? requiredStringLengthRange(String? value,[int min = 1,int max = 256,]){
    if(value == null || value.trim().length > max || value.trim().length < min) return requiredLength.tr.replaceAll("X", "$min - $max");
    return null;
  }

  static String? validatePhoneNumber(String? value){
    if(value == null || value.isEmpty) return phoneRequired.tr;

    final normalized = value.normalized;
    for(var regex in _phoneRegex){
      if(regex.hasMatch(normalized))
        return null;
    }
    return phoneNotValid.tr;
  }

  static String? validateNullableNumber(String? value){
    if(value != null && int.tryParse(value) == null && value.isNotEmpty){
      return numberNotValid;
    }
    return null;
  }

  static String? validateBirth(DateTime? value){
    if(value != null &&
        (
            value.millisecondsSinceEpoch > DateTime.now().subtract(Duration(days: 365*15)).millisecondsSinceEpoch ||
            value.millisecondsSinceEpoch < DateTime.now().subtract(Duration(days: 365*100)).millisecondsSinceEpoch
        )
    ) {
      return invalidBirth.tr;
    }
    return null;
  }

  static String? validateRequiredBirth(DateTime? value){
    if(value == null){
      return birthRequired.tr;
    }
    return validateBirth(value);
  }

  static String? validateRequiredAny(dynamic value){
    if(value == null){
      return required.tr;
    }
    return null;
  }
}
