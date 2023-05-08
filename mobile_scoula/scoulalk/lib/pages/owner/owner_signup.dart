import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:scoulalk/components/my_textfield.dart';
import 'package:scoulalk/components/my_button.dart';
import 'package:scoulalk/components/square_tile.dart';
import 'package:http/http.dart' as http;
import 'package:scoulalk/config/imp.dart';

import 'owner_signin.dart';

class OwnerRegister extends StatefulWidget {
  const OwnerRegister({super.key});

  @override
  State<OwnerRegister> createState() => _OwnerRegisterState();
}

class _OwnerRegisterState extends State<OwnerRegister> {
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

      var response = await http.post(Uri.parse(register),
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
                  'Register as Owner',
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
                  controller: mobileController,
                  hintText: 'Enter your mobile number',
                  obscureText: false,
                  errorText: _isnotvalidate ? "mobile number is invalid" : "",
                ),

                const SizedBox(height: 10),

                // password textfield
                MyTextField(
                  controller: passwordController,
                  hintText: 'Enter your password',
                  obscureText: true,
                  errorText: _isnotvalidate ? "password is invalid" : "",
                ),

                const SizedBox(height: 25),

                // sign in button
                MyButton(
                  btntext: "Sign Up",
                  onTap: signUpuser,
                ),

                const SizedBox(height: 50),

                const SizedBox(height: 50),

                // not a member? register now
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'Already Registered?',
                      style: TextStyle(color: Colors.grey[700]),
                    ),
                    const SizedBox(width: 4),
                    GestureDetector(
                      onTap: (() => {
                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => OwnerLogin()))
                          }),
                      child: const Text(
                        'Login Now',
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
