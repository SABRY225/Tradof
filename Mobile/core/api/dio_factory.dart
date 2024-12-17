import 'package:dio/dio.dart';
import 'package:pretty_dio_logger/pretty_dio_logger.dart';
import 'end_points.dart';
import '../cache/cache_helper.dart';
import '../utils/app_constants.dart';

class DioFactory {
  /// private constructor as I don't want to allow creating an instance of this class
  DioFactory._();

  static Dio? dio;

  static Dio getDio() {
    Duration timeOut = const Duration(seconds: 15);

    if (dio == null) {
      dio = Dio();
      dio!
        ..options.baseUrl = EndPoint.baseUrl
        ..options.connectTimeout = timeOut
        ..options.receiveTimeout = timeOut;
      addDioHeaders();
      addDioInterceptor();
      return dio!;
    } else {
      return dio!;
    }
  }

  static void addDioHeaders() async {
    final userToken =
        await CacheHelper.getSecuredString(AppConstants.userToken);
    dio?.options.headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer $userToken',
    };
  }

  static void setTokenIntoHeaderAfterLogin(String token) {
    await CacheHelper.setSecuredString(AppConstants.userToken, userToken);
    dio?.options.headers = {
      'Authorization': 'Bearer $token',
    };
  }

  static void addDioInterceptor() {
    dio?.interceptors.add(
      PrettyDioLogger(
        requestBody: true,
        requestHeader: true,
        responseHeader: true,
      ),
    );
  }
}
