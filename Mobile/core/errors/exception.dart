import 'package:dio/dio.dart';

import 'failure.dart';

class ServerFailure extends Failure {
  ServerFailure(String errMessage) : super(errMessage: errMessage);

  factory ServerFailure.fromDioError(DioException dioError) {
    switch (dioError.type) {
      case DioExceptionType.connectionTimeout:
        return ServerFailure('انتهت مهلة الاتصال بالخادم ⏳');
      case DioExceptionType.sendTimeout:
        return ServerFailure('انتهت مهلة إرسال البيانات إلى الخادم 📤');
      case DioExceptionType.receiveTimeout:
        return ServerFailure('انتهت مهلة استقبال البيانات من الخادم 📥');
      case DioExceptionType.badResponse:
        return ServerFailure.fromResponse(
            dioError.response!.statusCode!, dioError.response!.data);
      case DioExceptionType.cancel:
        return ServerFailure('تم إلغاء الطلب إلى الخادم 🚫');
      case DioExceptionType.connectionError:
        return ServerFailure('لا يوجد اتصال بالانترنت 😥📡');
      case DioExceptionType.unknown:
        return ServerFailure('خطأ غير متوقع، يرجى المحاولة مرة أخرى ❗');
      case DioExceptionType.badCertificate:
        return ServerFailure('خطأ في الشهادة 🔒');
      default:
        return ServerFailure('عذرًا، حدث خطأ، يرجى المحاولة مرة أخرى ⚠️');
    }
  }

  factory ServerFailure.fromResponse(int statusCode, dynamic response) {
    if (statusCode == 400 || statusCode == 401 || statusCode == 403) {
      return ServerFailure('${response.toString()} 🚫');
    } else if (statusCode == 404) {
      return ServerFailure('${response.toString()} 🔍');
    } else if (statusCode == 500) {
      return ServerFailure('خطأ في الخادم الداخلي، يرجى المحاولة لاحقًا! 💻');
    } else {
      return ServerFailure('عذرًا، حدث خطأ، يرجى المحاولة مرة أخرى ⚠️');
    }
  }
}
