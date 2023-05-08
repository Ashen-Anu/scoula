import { Router } from "express";
const router= Router();

/** Import all controllers */
import * as controller from '../controllers/appController.js';
import { registerMail } from "../controllers/mailer.js";
import Auth,{localvariables} from "../middleware/auth.js";


/** POST */
//registration
router.route('/register').post(controller.register);
router.route('/driverregister').post(controller.driverregister);
router.route('/ownerregister').post(controller.ownerregister);
//login
router.route('/login').post(controller.verifyUser,controller.login);
router.route('/driverlogin').post(controller.verifyDriver,controller.driverlogin);
router.route('/ownerlogin').post(controller.verifyOwner,controller.ownerlogin);

router.route('/registerMail').post(registerMail); //send email
router.route('/authenticate').post(controller.verifyUser,(req,res)=> res.end()); //authenticate
router.route('/authenticateowner').post(controller.verifyOwner,(req,res)=> res.end()); //authenticate
router.route('/authenticated').post(controller.verifyDriver,(req,res)=> res.end()); //authenticate
router.route('/addvehicle').post(controller.addVehicle);


/** GET */ 
router.route('/user/:email').get(controller.getUser)
router.route('/driver/:email').get(controller.getDriver)
router.route('/owner/:email').get(controller.getOwner)
router.route('/generateOTP').get(controller.verifyUser,localvariables,controller.generateOTP) //get otp
router.route('/generateownerOTP').get(controller.verifyOwner,localvariables,controller.generateOTP) //get otp
router.route('/generatedriverOTP').get(controller.verifyDriver,localvariables,controller.generateOTP) //get otp
router.route('/verifyOTP').get(controller.verifyUser,controller.verifyOTP) //verify otp
router.route('/createResetSession').get(controller.createResetSession) //reset variable
router.route('/getVehicledata').get(controller.getVehicledata)

/** PUT */
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); //reset password
router.route('/ownerresetPassword').put(controller.verifyUser, controller.ownerresetPassword); //reset password
router.route('/driverresetPassword').put(controller.verifyUser, controller.driverresetPassword); //reset password


export default router;