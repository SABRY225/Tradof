import 'package:get_it/get_it.dart';
import 'package:dio/dio.dart';

import '../api/api_service.dart';
import '../api/dio_factory.dart';

final getIt = GetIt.instance;

void setupGetIt() {
  // Dio & ApiServices
  Dio dio = DioFactory.getDio();
  getIt.registerLazySingleton<ApiServices>(() => ApiServices(dio: dio));
}
