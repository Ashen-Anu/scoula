import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:scoulalk/components/my_textfield.dart';
import 'package:scoulalk/components/my_button.dart';
import 'package:scoulalk/components/square_tile.dart';
import 'package:http/http.dart' as http;
import 'package:scoulalk/config/imp.dart';
import 'package:scoulalk/pages/owner/owner_reset.dart';

import 'owner_signup.dart';

class OwnerLogin extends StatefulWidget {
  const OwnerLogin({super.key});

  @override
  State<OwnerLogin> createState() => _OwnerLoginState();
}

class _OwnerLoginState extends State<OwnerLogin> {
  // text editing controllers
  final emailController = TextEditingController();
  final mobileController = TextEditingController();
  final passwordController = TextEditingController();
  bool _isnotvalidate = false;

  // sign user in method
  void signUpuser() async {
    if (emailController.text.isNotEmpty &&
        mobileController.text.isNotEmpty &&
        passwordController.text.isNotEmpty) {
      var regBody = {
        "email": emailController.text,
        "mobile": mobileController.text,
        "password": passwordController.text,
      };

      var response = await http.post(Uri.parse(login),
          headers: {"Content-Type": "application/json"},
          body: jsonEncode(regBody));
      var jsonResponse = jsonDecode(response.body);
      print(jsonResponse['status']);
      if (jsonResponse['status']) {
        Navigator.push(
            context, MaterialPageRoute(builder: (context) => OwnerLogin()));
      } else {
        print("something went wrong");
      }
    } else {
      setState(() {
        _isnotvalidate = true;
      });
    }
  }

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
                  'Welcome Back Owner!',
                  style: TextStyle(
                    color: Colors.grey[700],
                    fontSize: 16,
                  ),
                ),

                const SizedBox(height: 25),

                // username textfield
                MyTextField(
                  controller: emailController,
                  hintText: 'Enter your email',
                  //make the text visible
                  obscureText: false,
                  errorText: _isnotvalidate ? "Email is invalid" : "",
                ),

                const SizedBox(height: 10),

                // password textfield
                MyTextField(
                  controller: passwordController,
                  hintText: 'Enter your password',
                  obscureText: true,
                  errorText: _isnotvalidate ? "password is invalid" : "",
                ),
                const SizedBox(height: 10),

                // forgot password?
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 25.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      GestureDetector(
                        onTap: (() => {
                              Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) => OwnerReset()))
                            }),
                        child: Text(
                          'Forgot Password?',
                          style: TextStyle(color: Colors.grey[600]),
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 25),

                // sign in button
                MyButton(
                  btntext: "Sign In",
                  onTap: signUpuser,
                ),

                const SizedBox(height: 50),

                // not a member? register now
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'Not a member?',
                      style: TextStyle(color: Colors.grey[700]),
                    ),
                    const SizedBox(width: 4),
                    GestureDetector(
                      onTap: (() => {
                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => OwnerRegister()))
                          }),
                      child: const Text(
                        'Register Now',
                        style: TextStyle(
                          color: Colors.blue,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
