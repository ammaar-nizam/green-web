import 'package:flutter/material.dart';
import 'package:green_web01/Screen/complaint..dart';
import 'package:green_web01/Screen/home.dart';
import 'package:green_web01/Screen/login_signup.dart';

void main() {
  runApp(LoginSignupUI());
}

class LoginSignupUI extends StatelessWidget {
  const LoginSignupUI({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: "Login Signup UI",
      home:Complaint(),//home(), //LoginSignupScreen(), 
    );
  }
}
