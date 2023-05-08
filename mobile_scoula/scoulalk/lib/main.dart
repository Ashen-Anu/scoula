import 'package:flutter/material.dart';
import 'package:scoulalk/pages/driver/driver_signin.dart';
import 'package:scoulalk/pages/driver/driver_signup.dart';
import 'package:scoulalk/pages/welcome.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: WelcomeScreen(),
    );
  }
}
