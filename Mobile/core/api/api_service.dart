import 'package:dio/dio.dart';

import 'api_requests.dart';

class ApiServices implements ApiRequests {
  final Dio _dio;

  ApiServices({required Dio dio}) : _dio = dio;

//! Get Request
  @override
  Future<dynamic> get(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
  }) async {
    final response = await _dio.get(
      path,
      data: data,
      queryParameters: queryParameters,
    );
    return response.data;
  }

//! Post Request
  @override
  Future<dynamic> post(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    bool isFormData = false,
  }) async {
    final response = await _dio.post(
      path,
      data: isFormData ? FormData.fromMap(data) : data,
      queryParameters: queryParameters,
    );
    return response.data;
  }

//! Delete Request
  @override
  Future<dynamic> delete(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    bool isFormData = false,
  }) async {
    final response = await _dio.delete(
      path,
      data: isFormData ? FormData.fromMap(data) : data,
      queryParameters: queryParameters,
    );
    return response.data;
  }

//! Patch Request
  @override
  Future<dynamic> patch(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    bool isFormData = false,
  }) async {
    final response = await _dio.patch(
      path,
      data: isFormData ? FormData.fromMap(data) : data,
      queryParameters: queryParameters,
    );
    return response.data;
  }
}
