import UserModel from "../model/User.model.js"
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import ENV from "../config.js";
import otpGenerator from "otp-generator"
import vehiclemodel from "../model/vehiclemodel.js";
import ownermodel from "../model/ownermodel.js";
import drivermodel  from "../model/drivermodel.js";


/** Middleware for verify driver */
export async function verifyDriver(req,res,next){
    try{
        const {email}= req.method=="GET" ? req.query:req.body;

        //check the user existence
        let exist= await drivermodel.findOne({email})
        if (!exist) return res.status(404).send({error:"Cannot find driver"});
        next();
    }
    catch(error){
        return res.status(404).send({error: "Authentication Error"});
    }
}
/** Middleware for verify owner */
export async function verifyOwner(req,res,next){
    try{
        const {email}= req.method=="GET" ? req.query:req.body;

        //check the user existence
        let exist= await ownermodel.findOne({email})
        if (!exist) return res.status(404).send({error:"Cannot find Owner"});
        next();
    }
    catch(error){
        return res.status(404).send({error: "Authentication Error"});
    }
}

/** Middleware for verify parent */
export async function verifyUser(req,res,next){
    try{
        const {email}= req.method=="GET" ? req.query:req.body;

        //check the user existence
        let exist= await UserModel.findOne({email})
        if (!exist) return res.status(404).send({error:"Cannot find Parent"});
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
  "password":"example01"
  }
*/
export async function driverregister(req,res){
    try {
        const { email, mobile, password }=req.body;

        //check whether the email is existing.
        const existEmail= await drivermodel.findOne({email})
        if(existEmail){
            return res.status(400).json({errorMessage: "Driver Already Registered"})
        }
            if(password){
                bcrypt.hash(password,10)
                .then(hashedPassword =>{

                    const driver= new drivermodel({
                        email,
                        mobile,
                        password:hashedPassword
                    })

                    //return and save the result as a response
                    driver.save()
                    
                        .then(res.json({status:true, success:"Driver Registered Successfully"}))
                        .catch(error=>res.status(500).send({msg:error}))
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

export async function ownerregister(req,res){
    try {
        const { email, mobile, password }=req.body;

        //check whether the email is existing.
        const existEmail= await ownermodel.findOne({email})
        if(existEmail){
            return res.status(400).json({errorMessage: "Owner Already Registered"})
        }
            if(password){
                bcrypt.hash(password,10)
                .then(hashedPassword =>{

                    const owner= new ownermodel({
                        email,
                        mobile,
                        password:hashedPassword
                    })

                    //return and save the result as a response
                    owner.save()
                    
                        .then(res.json({status:true, success:"Owner Registered Successfully"}))
                        .catch(error=>res.status(500).console.error("error"+error));
                }).catch(err=>{
                    return res.status(490).send({
                        error: "Enable to hashed password"+err
                    })
                })
            }
    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function register(req,res){
    try {
        const { email, mobile, password }=req.body;

        //check whether the email is existing.
        const existEmail= await UserModel.findOne({email})
        if(existEmail){
            return res.status(400).json({errorMessage: "Parent Already Registered"})
        }
            if(password){
                bcrypt.hash(password,10)
                .then(hashedPassword =>{

                    const user= new UserModel({
                        email,
                        mobile,
                        password:hashedPassword
                    })

                    //return and save the result as a response
                    user.save()
                    
                        .then(res.json({status:true, success:"Parent Registered Successfully"}))
                        .catch(error=>res.status(500).send({msg:error}))
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
 export async function ownerlogin(req,res){
    const {email,password}=req.body;

    try {
        ownermodel.findOne({email})
        .then(owner=>{
            bcrypt.compare(password,owner.password)
            .then(passwordCheck=>{
                if(!passwordCheck) return res.status(400).send({error:"username or password is incorrect"})

                //create jwt to authenticate the user
                const token= jwt.sign({
                    ID:owner._id,
                    email: owner.email,
                },ENV.JWT_SECRET,{expiresIn:'24h'});
                return res.status(200).send({
                    msg:"Login Successful",
                    email:owner.email,
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


/** POST : http://localhost:8080/api/login
 @param:{
 "email":"example1@gmail.com",
 "password":"example01"
 }
 */
 export async function driverlogin(req,res){
    const {email,password}=req.body;

    try {
        drivermodel.findOne({email})
        .then(driver=>{
            bcrypt.compare(password,driver.password)
            .then(passwordCheck=>{
                if(!passwordCheck) return res.status(400).send({error:"username or password is incorrect"})

                //create jwt to authenticate the user
                const token= jwt.sign({
                    userID:driver._id,
                    email: driver.email,
                },ENV.JWT_SECRET,{expiresIn:'24h'});
                return res.status(200).send({
                    msg:"Login Successful",
                    email:driver.email,
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


export async function getDriver(req,res){
    
    const { email } = req.params;

    try {
        
        if(!email) return res.status(501).send({ error: "Invalid Email"});

        drivermodel.findOne({ email }, function(err, driver){
            if(err) return res.status(500).send({ err });
            if(!driver) return res.status(501).send({ error : "Couldn't Find the Driver"});

            /** remove password from user */
            // mongoose return unnecessary data with object so convert it into json
            const { password, ...rest } = Object.assign({}, driver.toJSON());

            return res.status(201).send(rest);
        })

    } catch (error) {
        return res.status(404).send({ error : "Cannot Find Driver Data"});
    }

}


export async function getOwner(req,res){
    
    const { email } = req.params;

    try {
        
        if(!email) return res.status(501).send({ error: "Invalid Email"});

        ownermodel.findOne({ email }, function(err, owner){
            if(err) return res.status(500).send({ err });
            if(!owner) return res.status(501).send({ error : "Couldn't Find the Owner"});

            /** remove password from user */
            // mongoose return unnecessary data with object so convert it into json
            const { password, ...rest } = Object.assign({}, owner.toJSON());

            return res.status(201).send(rest);
        })

    } catch (error) {
        return res.status(404).send({ error : "Cannot Find Owner's Data"});
    }

}




export async function getUser(req,res){
    
    const { email } = req.params;

    try {
        
        if(!email) return res.status(501).send({ error: "Invalid Email"});

        UserModel.findOne({ email }, function(err, user){
            if(err) return res.status(500).send({ err });
            if(!user) return res.status(501).send({ error : "Couldn't Find the Parent"});

            /** remove password from user */
            // mongoose return unnecessary data with object so convert it into json
            const { password, ...rest } = Object.assign({}, user.toJSON());

            return res.status(201).send(rest);
        })

    } catch (error) {
        return res.status(404).send({ error : "Cannot Find Parent Data"});
    }

}


/** GET : http://localhost:8080/api/generateOTP */
export async function generateOTP(req,res){
    req.app.locals.OTP= await otpGenerator.generate(6,{lowerCaseAlphabets:false, upperCaseAlphabets:false, specialChars:false})
    res.status(201).send({code:req.app.locals.OTP})
}
export async function generateownerOTP(req,res){
    req.app.locals.OTP= await otpGenerator.generate(6,{lowerCaseAlphabets:false, upperCaseAlphabets:false, specialChars:false})
    res.status(201).send({code:req.app.locals.OTP})
}
export async function generatedriverOTP(req,res){
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
export async function ownerresetPassword(req,res){
    try {

        if(!req.app.locals.resetSession) return res.status(440).send({error:"Session Expired!"})

        const { email,password }=req.body
        try {
            ownermodel.findOne({email})
            .then(owner=>{
                bcrypt.hash(password,10)
                  .then(hashedPassword=>{
                    ownermodel.updateOne({email: owner.email},
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
                return res.status(404).send({error:"Owner not found"});
            })
        } catch (error) {
            return res.status(500).send({error})
        }
    } catch (error) {
        return res.status(401).send({error})
    }
}




/** PUT : http://localhost:8080/api/resetPassword */
export async function driverresetPassword(req,res){
    try {

        if(!req.app.locals.resetSession) return res.status(440).send({error:"Session Expired!"})

        const { email,password }=req.body
        try {
            drivermodel.findOne({email})
            .then(driver=>{
                bcrypt.hash(password,10)
                  .then(hashedPassword=>{
                    drivermodel.updateOne({email: driver.email},
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
                return res.status(404).send({error:"Driver not found"});
            })
        } catch (error) {
            return res.status(500).send({error})
        }
    } catch (error) {
        return res.status(401).send({error})
    }
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
                return res.status(404).send({error:"Parent not found"});
            })
        } catch (error) {
            return res.status(500).send({error})
        }
    } catch (error) {
        return res.status(401).send({error})
    }
}

/** POST : http://localhost:8080/api/addvehicle 
  @param:{
    "vehicle_model":"toyota",
    "vehicle_number":"PC-2002",
    "mobile_number":"0714242121",
    "seating_capacity":"15",
    "start_location":"Matara",
    "end_location":"Thihagoda",
    "start_time":"8.00",
    "end_time":"8.14",
    "route":"aass",
    "photo":""
  }
*/
export async function addVehicle(req,res){
    try {
        const { vehicle_model, vehicle_number, mobile, seating_capacity,start_location,end_location, start_time, end_time,  route, photo }=req.body;

        //check whether the vehicle number is existing.
        const existVN= await vehiclemodel.findOne({vehicle_number})
        if(existVN){
            return res.status(400).json({errorMessage: "The Vehicle is already registered"})
        }
        const vehicle= new vehiclemodel({
            vehicle_model, 
            vehicle_number, 
            mobile, 
            seating_capacity,
            start_location,
            end_location, 
            start_time, 
            end_time,
            route,
            photo:photo ||''
        })

        //return and save the result as a response
        vehicle.save()
            .then(result=>res.status(201).send({msg:"Listing added"}))
            .catch(error=>res.status(500).send({error}))}
     catch (error) {
        return res.status(500).send(error);
    }
}
export async function getVehicledata(req,res){
    try {
        const vehicles= await vehiclemodel.find();
        res.json(vehicles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}