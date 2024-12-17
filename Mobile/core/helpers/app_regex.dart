class AppRegex {
  //! return false if there is any arabic letter in the string
  static bool containsEnglish(String name) {
    RegExp englishRegex = RegExp(r'^[^a-zA-Z]+$');
    return !englishRegex.hasMatch(name);
  }

//! return false if there is any english letter in the string
  static bool hasNoArabic(String name) {
    RegExp arabicRegex = RegExp(r'[\u0600-\u06FF]');
    return !arabicRegex.hasMatch(name);
  }

  static bool isEmailValid(String email) {
    return RegExp(r'^.+@[a-zA-Z]+\.{1}[a-zA-Z]+(\.{0,1}[a-zA-Z]+)$')
            .hasMatch(email) &&
        !RegExp(r'[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+').hasMatch(email);
  }

  static bool isPasswordValid(String password) {
    return RegExp(
            r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")
        .hasMatch(password);
  }

  static bool isPhoneNumberValid(String phoneNumber) {
    return RegExp(r'^(010|011|012|015)[0-9]{8}$').hasMatch(phoneNumber);
  }

  static bool hasLowerCase(String password) {
    return RegExp(r'^(?=.*[a-z])').hasMatch(password);
  }

  static bool hasUpperCase(String password) {
    return RegExp(r'^(?=.*[A-Z])').hasMatch(password);
  }

  static bool hasNumber(String password) {
    return RegExp(r'^(?=.*?[0-9])').hasMatch(password);
  }

  static bool hasSpecialCharacter(String password) {
    return RegExp(r'^(?=.*?[#?!@$%^&*-])').hasMatch(password);
  }

  static bool hasMinLength(String password) {
    return RegExp(r'^(?=.{8,})').hasMatch(password);
  }
}
