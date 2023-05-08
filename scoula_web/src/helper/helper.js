import axios from 'axios';
import jwt_decode from 'jwt-decode';
axios.defaults.baseURL= "http://localhost:8080";

/** Make API requrest */

/** Get email from token */
export async function getEmail(){
    const token= localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find token")
    let decode=jwt_decode(token)
    console.log(decode);
}

/** Authenticate Function */
export async function authenticate(email){
    try {
        return await axios.post('/api/authenticate',{ email })
    } catch (error) {
        return {error:"Username doesn't exist..!"}
    }
}
export async function authenticateowner(email){
    try {
        return await axios.post('/api/authenticateowner',{ email })
    } catch (error) {
        return {error:"Username doesn't exist..!"}
    }
}
export async function authenticatedriver(email){
    try {
        return await axios.post('/api/authenticated',{ email })
    } catch (error) {
        return {error:"Username doesn't exist..!"}
    }
}




/** Get User Details */
export async function getUser({ email }){
    try {
        const { data }=await axios.get(`api/user/${email}`)
        return { data }
    } catch (error) {
        return {error :"Password do not match"}
    }
}
/** Get Owner Details */
export async function getOwner({ email }){
    try {
        const { data }=await axios.get(`api/owner/${email}`)
        return { data }
    } catch (error) {
        return {error :"Password do not match"}
    }
}
/** Get Driver Details */
export async function getDriver({ email }){
    try {
        const { data }=await axios.get(`api/driver/${email}`)
        return { data }
    } catch (error) {
        return {error :"Password do not match"}
    }
}

/** Register User Function */
export async function registerUser(credentials){
    try {
        const {data: {msg},status }=await axios.post(`/api/register`,credentials)

        let {email}=credentials;

        /** Send the email if registered */
        if(status===201){
            await axios.post('/api/registerMail',{ useremail:email, text: msg })
        }
        return Promise.resolve(msg);
    } catch (error) {
        return Promise.reject({error})
    }
}

/** Owner Reg */
export async function registerOwner(credentials){
    try {
        const {data: {msg},status }=await axios.post(`/api/ownerregister`,credentials)

        let {email}=credentials;

        /** Send the email if registered */
        if(status===201){
            await axios.post('/api/registerMail',{ useremail:email, text: msg })
        }
        return Promise.resolve(msg);
    } catch (error) {
        return Promise.reject({error})
    }
}

/** Driver Reg */
export async function registerDriver(credentials){
    try {
        const {data: {msg},status }=await axios.post(`/api/driverregister`,credentials)

        let {email}=credentials;

        /** Send the email if registered */
        if(status===201){
            await axios.post('/api/registerMail',{ useremail:email, text: msg })
        }
        return Promise.resolve(msg);
    } catch (error) {
        return Promise.reject({error})
    }
}

/** Login user */
export async function verifyPassword({email, password}){
    try {
        if(email){
            const {data}=await axios.post('/api/login',{email,password})
            return Promise.resolve({data});
        } 
    } catch (error) {
        return Promise.reject({error: "Password Doesn't Match...!"})
    }
}
/** Login driver */
export async function verifyDriverPassword({email, password}){
    try {
        if(email){
            const {data}=await axios.post('/api/driverlogin',{email,password})
            return Promise.resolve({data});
        } 
    } catch (error) {
        return Promise.reject({error: "Password Doesn't Match...!"})
    }
}
/** Login owner */
export async function verifyOwnerPassword({email, password}){
    try {
        if(email){
            const {data}=await axios.post('/api/ownerlogin',{email,password})
            return Promise.resolve({data});
        } 
    } catch (error) {
        return Promise.reject({error: "Password Doesn't Match...!"})
    }
}
/** Generate OTP */
export async function generateOTP(email){
    try {
        const {data : { code }, status } = await axios.get('/api/generateOTP', { params : { email }});

        // send mail with the OTP
        if(status === 201){
            let result = await getUser({ email });
            let emaill = result.data.email;
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/api/registerMail', { useremail: emaill, text, subject : "Password Recovery OTP"})
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}
/** Generate OTP */
export async function generateownerOTP(email){
    try {
        const {data : { code }, status } = await axios.get('/api/generateownerOTP', { params : { email }});

        // send mail with the OTP
        if(status === 201){
            let result = await getOwner({ email });
            let emaill = result.data.email;
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/api/registerMail', { useremail: emaill, text, subject : "Password Recovery OTP"})
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}
/** Generate OTP */
export async function generatedriverOTP(email){
    try {
        const {data : { code }, status } = await axios.get('/api/generatedriverOTP', { params : { email }});

        // send mail with the OTP
        if(status === 201){
            let result = await getDriver({ email });
            let emaill = result.data.email;
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/api/registerMail', { useremail: emaill, text, subject : "Password Recovery OTP"})
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}


/** verify OTP */
export async function verifyOTP({ email, code }){
    try {
       const { data, status } = await axios.get('/api/verifyOTP', { params : { email, code }})
       return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}


/** reset password */
export async function resetPassword({ email, password }){
    try {
        const { data, status } = await axios.put('/api/resetPassword', { email, password });
        return Promise.resolve({ data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}
export async function ownerresetPassword({ email, password }){
    try {
        const { data, status } = await axios.put('/api/ownerresetPassword', { email, password });
        return Promise.resolve({ data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}
export async function driverresetPassword({ email, password }){
    try {
        const { data, status } = await axios.put('/api/driverresetPassword', { email, password });
        return Promise.resolve({ data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}

/** Add Vehicle Function */
export async function addVehicle(credentials){
    try {
        const {data:{msg} }=await axios.post(`/api/addvehicle`,credentials)

        return Promise.resolve(msg);
    } catch (error) {
        return Promise.reject({error})
    }
}