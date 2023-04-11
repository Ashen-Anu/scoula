import jwt from "jsonwebtoken";
import ENV from "../config.js";


export default async function Auth(req,res,next){
    try {
        //access authorize header to validate request
        const token= req.headers.authorization.split(" ")[1];

        //retrieve user details for the logged in user
        const decodedToken= await jwt.verify(token, ENV.JWT_SECRET);

        req.user=decodedToken;


        res.json(decodedToken);
    } catch (error) {
        res.status(401).json({error:"Authentication Failed!"})
    }
}


/** Middle ware for the local variable */
export function localvariables(req,res,next){
    req.app.locals={
        OTP: null,
        resetSession: false
    }
    next();
}