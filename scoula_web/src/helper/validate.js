import { toast } from "react-hot-toast";
import { authenticate } from "./helper";
 
/*validate username */
export async function usernameValidate(values){
    const errors = usernameVerify({}, values); 
    
    if(values.email){
        //check user exist or not
        const {status}=await authenticate(values.email);
        if(status!==200){
            errors.exist=toast.error('User does not exist')
        }
    }
    return errors;
}


/* Validate Username*/
function usernameVerify(error={}, values){
    if(!values.email){
        error.email=toast.error("Email Required...!");
    }
    return error;
}


/* validate password */
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);
    return errors;
}

/* Validate reset password */
export async function resetpasswordVal(values){
    const error=passwordVerify({},values);
    if(values.password !== values.cpassword){
        error.exist=toast.error("Passwords do not match");
}

}


/* Validate password */
function passwordVerify(error={}, values){

    if(!values.password){
        error.password=toast.error("Password Required...!");
    }
    else if(values.password.length<6){
        error.password=toast.error("Password should contain minimum of 6 characters")
    }
    return error;
}



/*validate regform */
export async function registerValidate(values){
    const errors= usernameVerify({},values);
    passwordVerify(errors,values);
    verifyMobile(errors,values);
    roleVerify(errors,values);
    return errors;
}


function verifyMobile(error={}, values){
    if(!values.mobile){
        error.mobile=toast.error("Mobile Number Required...!");
    }
    return error;
}

function roleVerify(error={}, values){

    /* const role1="Parent";
    const role2="Owner";
    const role3="Driver"; */
    
    if(!values.role){
        error.role=toast.error("Role Required...!")
    }
    /* else if(!role1.test(values.role)){
        error.role=toast.error("Choose one of the given roles")
    }
    else if(!role2.test(values.role)){
        error.role=toast.error("Choose one of the given roles")
    }
    else if(!role3.test(values.role)){
        error.role=toast.error("Choose one of the given roles")
    } */

    return error;
}

export async function profileVal(values){
    const errors= usernameVerify({},values);
    return errors;
}