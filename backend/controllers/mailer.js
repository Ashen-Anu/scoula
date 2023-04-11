import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import ENV from "../config.js"


//https://ethereal.email/create
let nodeConfig={
    host :"smtp.ethereal.email",
    port: 587,
    secure:false,
    auth:{
        user:ENV.EMAIL,
        pass:ENV.PASSWORD
    }
}
let transporter = nodemailer.createTransport(nodeConfig);
let Mailgenerator= new Mailgen({
    theme : "default",
    product : {
        name: "Mailgen",
        link: "https://mailgen.js/"
    }
})

/** POST : http://localhost:8080/api/reigsterMail
 @param:{
 "useremail":"example1@gmail.com",
 "text":"",
 "subject":"",
 }
 */
export const registerMail=async(req,res)=>{
    const {useremail, text, subject}=req.body;

    var email={
        body:{
            intro:text || "You have successfully registered to SCOULALK. We're very excited to have you on our system.",
            outro:"Need any assistance? Reply to this email or call 0706178375"
        }
    }
    var emailBody=Mailgenerator.generate(email);

    let message={
        from:ENV.EMAIL,
        to: useremail,
        subject:subject || "Signup Successful",
        html:emailBody
    }

    //send mail
    transporter.sendMail(message)
    .then(()=>{
        return res.status(200).send({msg:"You should receive an email from us soon :)"})
    })
    .catch(error=> res.status(500).send({error}))
}