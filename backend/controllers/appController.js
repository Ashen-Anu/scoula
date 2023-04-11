import UserModel from "../model/User.model.js"
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import ENV from "../config.js";
import otpGenerator from "otp-generator"


/** Middleware for verify user */
export async function verifyUser(req,res,next){
    try{
        const {email}= req.method=="GET" ? req.query:req.body;

        //check the user existence
        let exist= await UserModel.findOne({email})
        if (!exist) return res.status(404).send({error:"Cannot find user"});
        next();
    }
    catch(error){
        return res.status(404).send({error: "Authentication Error"});
    }
}

/** POST : http://localhost:8080/api/register 
  @param:{
  "email":"example1@gmail.com",
  "mobile":"example01",
  "password":"example01",
  "role":"example01",
  "fname":"example",
  "lname":"01",
  "nic":"example01",
  "address":"exampleaddress"
  }
*/
export async function register(req,res){
    try {
        const { email, mobile, password, role }=req.body;

        //check whether the email is existing.
        const existEmail= await UserModel.findOne({email})
        if(existEmail){
            return res.status(400).json({errorMessage: "User Already Registered"})
        }
            if(password){
                bcrypt.hash(password,10)
                .then(hashedPassword =>{

                    const user= new UserModel({
                        email,
                        mobile,
                        password:hashedPassword,
                        role
                    })

                    //return and save the result as a response
                    user.save()
                        .then(result=>res.status(201).send({msg:"User Registered Successfully"}))
                        .catch(error=>res.status(500).send({error}))
                }).catch(err=>{
                    return res.status(500).send({
                        error: "Enable to hashed password"+err
                    })
                })
            }
    } catch (error) {
        return res.status(500).send(error);
    }
}

/** POST : http://localhost:8080/api/login
 @param:{
 "email":"example1@gmail.com",
 "password":"example01"
 }
 */
export async function login(req,res){
    const {email,password}=req.body;

    try {
        UserModel.findOne({email})
        .then(user=>{
            bcrypt.compare(password,user.password)
            .then(passwordCheck=>{
                if(!passwordCheck) return res.status(400).send({error:"username or password is incorrect"})

                //create jwt to authenticate the user
                const token= jwt.sign({
                    userID:user._id,
                    email: user.email,
                },ENV.JWT_SECRET,{expiresIn:'24h'});
                return res.status(200).send({
                    msg:"Login Successful",
                    email:user.email,
                    token
                })
            })
        })
        .catch(error =>{ 
            return res.status(404).send({error:"Email isn't registered"});
        })
    } catch (error) {
        return res.status(500).send({err:"Error"+error});
    }
}


/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req,res){
    
    const { email } = req.params;

    try {
        
        if(!email) return res.status(501).send({ error: "Invalid Email"});

        UserModel.findOne({ email }, function(err, user){
            if(err) return res.status(500).send({ err });
            if(!user) return res.status(501).send({ error : "Couldn't Find the User"});

            /** remove password from user */
            // mongoose return unnecessary data with object so convert it into json
            const { password, ...rest } = Object.assign({}, user.toJSON());

            return res.status(201).send(rest);
        })

    } catch (error) {
        return res.status(404).send({ error : "Cannot Find User Data"});
    }

}


/** GET : http://localhost:8080/api/generateOTP */
 export async function generateOTP(req,res){
    req.app.locals.OTP= await otpGenerator.generate(6,{lowerCaseAlphabets:false, upperCaseAlphabets:false, specialChars:false})
    res.status(201).send({code:req.app.locals.OTP})
}

/** GET : http://localhost:8080/api/verifyOTP */
 export async function verifyOTP(req,res){
    const {code}=req.query;
    if(parseInt(req.app.locals.OTP)== parseInt(code)){
        req.app.locals.OTP=null; //reset OTP value
        req.app.locals.resetSession= true; //start session for reset password
        return res.status(201).send({msg:'verfied successfully'})
    }
    return res.status(400).send({error:"Invalid OTP"});
}


//redirect when the OTP is valid.
/** GET : http://localhost:8080/api/createResetSession */
export async function createResetSession(req,res){
    if(req.app.locals.resetSession){
        return res.status(201).send({ flag: req.app.locals.resetSession })
    }
    return res.status(440).send({error:"Session Expired"})
}


/** PUT : http://localhost:8080/api/resetPassword */
export async function resetPassword(req,res){
    try {

        if(!req.app.locals.resetSession) return res.status(440).send({error:"Session Expired!"})

        const { email,password }=req.body
        try {
            UserModel.findOne({email})
            .then(user=>{
                bcrypt.hash(password,10)
                  .then(hashedPassword=>{
                    UserModel.updateOne({email: user.email},
                        {password:hashedPassword}, function(err,data){
                            if(err) throw err;
                            req.app.locals.resetSession=false;
                            return res.status(201).send({msg:"Record Updated...!"})
                        });
                  })
                  .catch(e=>{
                    return res.status(500).send({
                        error:"Enable to hashed password"
                    })
                  })
            })
            .catch(error=>{
                return res.status(404).send({error:"Username not found"});
            })
        } catch (error) {
            return res.status(500).send({error})
        }
    } catch (error) {
        return res.status(401).send({error})
    }
}