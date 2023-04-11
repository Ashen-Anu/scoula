import axios from 'axios';
import jwt_decode from 'jwt-decode';
axios.defaults.baseURL= "http://localhost:8080";

/** Make API requrest */

/** Get username from token */
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

/** Get User Details */
export async function getUser({ email }){
    try {
        const { data }=await axios.get(`api/user/${email}`)
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