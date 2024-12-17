import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CacheHelper {
  // private constructor as I don't want to allow creating an instance of this class itself.
  CacheHelper._();

  static late SharedPreferences _sharedPreferences;

//! Here The Initialize of shared prefernece.
  static Future<void> init() async {
    _sharedPreferences = await SharedPreferences.getInstance();
  }

  /// Saves a [value] with a [key] in the SharedPreferences.
  static Future<void> setData(
      {required String key, required dynamic value}) async {
    debugPrint("CacheHelper : setData with key : $key and value : $value");
    if (value is bool) {
      await _sharedPreferences.setBool(key, value);
    } else if (value is String) {
      await _sharedPreferences.setString(key, value);
    } else if (value is int) {
      await _sharedPreferences.setInt(key, value);
    } else if (value is double) {
      await _sharedPreferences.setDouble(key, value);
    } else if (value is List<String>) {
      await _sharedPreferences.setStringList(key, value);
    } else {
      throw ArgumentError('Unsupported type');
    }
  }

  /// Gets a string value from SharedPreferences with given [key].
  static String getString(String key) {
    debugPrint('CacheHelper : getString with key : $key');
    return _sharedPreferences.getString(key) ?? '';
  }

  /// Gets a double value from SharedPreferences with given [key].
  static double getDouble(String key) {
    debugPrint('CacheHelper : getDouble with key : $key');
    return _sharedPreferences.getDouble(key) ?? 0.0;
  }

  /// Gets a int value from SharedPreferences with given [key].
  static int getInt(String key) {
    debugPrint('CacheHelper : getInt with key : $key');
    return _sharedPreferences.getInt(key) ?? 0;
  }

  /// Gets a bool value from SharedPreferences with given [key].
  static bool getBool(String key) {
    debugPrint('CacheHelper : getBool with key : $key');
    return _sharedPreferences.getBool(key) ?? false;
  }

  /// Gets a list of string values from SharedPreferences with given [key].
  static List<String> getStringList(String key) {
    debugPrint('CacheHelper : getStringList with key : $key');
    return _sharedPreferences.getStringList(key) ?? [];
  }

  /// Remove a value from SharedPreferences with given [key].
  static Future<bool> removeData({required String key}) async {
    return await _sharedPreferences.remove(key);
  }

  /// check if shared preference contains [key]
  static Future<bool> containsKey({required String key}) async {
    return _sharedPreferences.containsKey(key);
  }

  /// used to remove all data from shared preference
  static Future<bool> clearData({required String key}) async {
    return _sharedPreferences.clear();
  }

  //!------- these method used to save data in secure storage -------

//  /// Saves a [value] with a [key] in the FlutterSecureStorage.
//   static setSecuredString(String key, String value) async {
//     const flutterSecureStorage = FlutterSecureStorage();
//     debugPrint(
//         "FlutterSecureStorage : setSecuredString with key : $key and value : $value");
//     await flutterSecureStorage.write(key: key, value: value);
//   }

//   /// Gets an String value from FlutterSecureStorage with given [key].
//   static getSecuredString(String key) async {
//     const flutterSecureStorage = FlutterSecureStorage();
//     debugPrint('FlutterSecureStorage : getSecuredString with key :');
//     return await flutterSecureStorage.read(key: key) ?? '';
//   }

//   /// Removes all keys and values in the FlutterSecureStorage
//   static clearAllSecuredData() async {
//     debugPrint('FlutterSecureStorage : all data has been cleared');
//     const flutterSecureStorage = FlutterSecureStorage();
//     await flutterSecureStorage.deleteAll();
//   }

  //!--------------------------------------------------------------
}
