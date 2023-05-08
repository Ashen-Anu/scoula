import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:scoulalk/components/my_textfield.dart';
import 'package:scoulalk/components/my_button.dart';
import 'package:scoulalk/components/square_tile.dart';
import 'package:http/http.dart' as http;
import 'package:scoulalk/config/imp.dart';
import 'package:scoulalk/pages/driver/driver_signin.dart';
import 'package:scoulalk/pages/owner/owner_signin.dart';
import 'package:scoulalk/pages/parent/parent_reset.dart';
import 'package:scoulalk/pages/parent/parent_signin.dart';

class WelcomeScreen extends StatefulWidget {
  const WelcomeScreen({super.key});

  @override
  State<WelcomeScreen> createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: Colors.grey[300],
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            physics: BouncingScrollPhysics(),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const SizedBox(height: 50),
                Image.asset('images/logo.png'),
                const SizedBox(height: 50),

                // welcome back!
                Text(
                  'Choose to Continue',
                  style: TextStyle(
                    color: Colors.grey[700],
                    fontSize: 16,
                  ),
                ),

                const SizedBox(height: 25),

                // Owner Login
                GestureDetector(
                  child: MyButton(
                    btntext: "Continue as Owner",
                    onTap: (() => {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => OwnerLogin()))
                        }),
                  ),
                ),

                const SizedBox(height: 25),

                // sign in button
                GestureDetector(
                  child: MyButton(
                    btntext: "Continue as Driver",
                    onTap: (() => {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => DriverLogin()))
                        }),
                  ),
                ),

                const SizedBox(height: 25),

                // sign in button
                GestureDetector(
                  child: MyButton(
                    btntext: "Continue as Parent",
                    onTap: (() => {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => ParentLogin()))
                        }),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
