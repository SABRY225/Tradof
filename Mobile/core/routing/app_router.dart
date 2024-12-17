import 'package:flutter/material.dart';

class AppRouter {
  static Route<dynamic>? generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case Routes.splashViewRoute:
        return MaterialPageRoute(builder: (_) => const SplashView());
      default:
        return null;
    }
  }
}
