import { toast } from "react-hot-toast";
import { authenticate, authenticatedriver, authenticateowner } from "./helper";
 
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
/*validate owner username */
export async function ownerusernameValidate(values){
    const errors = usernameVerify({}, values); 
    
    if(values.email){
        //check user exist or not
        const {status}=await authenticateowner(values.email);
        if(status!==200){
            errors.exist=toast.error('User does not exist')
        }
    }
    return errors;
}
/*validate driver username */
export async function driverusernameValidate(values){
    const errors = usernameVerify({}, values); 
    
    if(values.email){
        //check user exist or not
        const {status}=await authenticatedriver(values.email);
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
    return errors;
}


function verifyMobile(error={}, values){
    if(!values.mobile){
        error.mobile=toast.error("Mobile Number Required...!");
    }
    else if(values.mobile.length!==10){
        error.mobile=toast.error("Please Enter a valid number");
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




// Functions required to add a vehicle
function modelVal(error={}, values){
    if(!values.vehicle_model){
        error.vehicle_model=toast.error("Vehicle Model Required...!");
    }
    return error;
}
function regnumVal(error={}, values){
    if(!values.vehicle_number){
        error.vehicle_number=toast.error("Vehicle Number Required...!");
    }
    else if(values.vehicle_number.length!==7){
        error.vehicle_number=toast.error("Please Enter the Vehicle Number to the format in the placeholder");
    }
    return error;
}
function seating_capacity(error={}, values){
    if(!values.seating_capacity){
        error.seating_capacity=toast.error("Seating Capacity Required...!");
    }
    return error;
}
function start_location(error={}, values){
    if(!values.start_location){
        error.start_location=toast.error("Start Location Required...!");
    }
    return error;
}
function end_location(error={}, values){
    if(!values.end_location){
        error.end_location=toast.error("End Location Required...!");
    }
    return error;
}
function start_time(error={}, values){
    if(!values.start_time){
        error.start_time=toast.error("Start Time Required...!");
    }
    return error;
}
function end_time(error={}, values){
    if(!values.end_time){
        error.end_time=toast.error("End Time Required...!");
    }
    return error;
}
function route(error={}, values){
    if(!values.route){
        error.route=toast.error("Route Required...!");
    }
    return error;
}

//Calling the export function 
export async function addVehicleValidate(values){
    const errors= modelVal({},values);
    regnumVal(errors,values);
    verifyMobile(errors,values);
    seating_capacity(errors,values);
    start_location(errors,values);
    end_location(errors,values);
    start_time(errors,values);
    end_time(errors,values);
    route(errors,values);
    return errors;
}

//calling name validate function
function nameVal(error={},values){
    if(!values.student_name){
        error.student_name= toast.error("Name Required")
    }
}

//calling export function of student reg page
export async function studentVal(values){
    const errors= nameVal({},values);
    verifyMobile(errors.values);
    start_location(errors.values);
    end_location(errors.values);
}