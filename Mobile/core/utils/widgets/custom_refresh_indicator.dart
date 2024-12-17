import 'package:flutter/material.dart';

import '../../theming/app_colors.dart';

class CustomRefreshIndicator extends StatelessWidget {
  const CustomRefreshIndicator({
    super.key,
    required this.child,
    required this.onRefresh,
  });
  final Widget child;
  final Future<void> Function() onRefresh;
  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      onRefresh: onRefresh,
      color: AppColors.white,
      backgroundColor: Colors.grey[900],
      child: child,
    );
  }
}
