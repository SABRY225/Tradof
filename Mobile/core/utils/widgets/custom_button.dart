import 'package:flutter/material.dart';

import '../../theming/app_colors.dart';
import '../../theming/app_style.dart';

class CustomButton extends StatelessWidget {
  const CustomButton({
    super.key,
    required this.text,
    required this.onPressed,
    this.color,
    this.width,
    this.height,
  });
  final String text;
  final VoidCallback onPressed;
  final Color? color;
  final double? width;
  final double? height;
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: _buttonStyle(),
      child: FittedBox(
        fit: BoxFit.scaleDown,
        child: Text(text, style: AppStyle.styleBold15),
      ),
    );
  }

  ButtonStyle _buttonStyle() {
    return ElevatedButton.styleFrom(
      backgroundColor: color ?? AppColors.primary,
      foregroundColor: Colors.white,
      minimumSize: const Size(width ?? double.infinity, height ?? 54),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.all(Radius.circular(15)),
      ),
    );
  }
}
