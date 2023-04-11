import { Router } from "express";
const router= Router();

/** Import all controllers */
import * as controller from '../controllers/appController.js';
import { registerMail } from "../controllers/mailer.js";
import Auth,{localvariables} from "../middleware/auth.js";


/** POST */
router.route('/register').post(controller.register);
router.route('/login').post(controller.verifyUser,controller.login);
router.route('/registerMail').post(registerMail); //send email
router.route('/authenticate').post(controller.verifyUser,(req,res)=> res.end()); //authenticate

/** GET */ 
router.route('/user/:email').get(controller.getUser)
router.route('/generateOTP').get(controller.verifyUser,localvariables,controller.generateOTP) //get otp
router.route('/verifyOTP').get(controller.verifyUser,controller.verifyOTP) //verify otp
router.route('/createResetSession').get(controller.createResetSession) //reset variable

/** PUT */
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); //reset password


export default router;