import 'package:equatable/equatable.dart';

class ErrorModel extends Equatable {
  final int? code;
  final String? message;

  const ErrorModel({required this.code, required this.message});
  factory ErrorModel.fromJson(Map jsonData) {
    return ErrorModel(
      message: jsonData["message"] as String?,
      code: jsonData["code"] as int?,
    );
  }

  @override
  List<Object?> get props => [code, message];
}
