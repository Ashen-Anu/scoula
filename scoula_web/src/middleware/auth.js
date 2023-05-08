import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store";

export const AuthorizeUser=({ children })=>{
    const token= localStorage.getItem('token');
    if(!token){
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    return children;
}

export const ProtectRoute= ({children})=>{
    const email = useAuthStore.getState().auth.email
    if(!email){
        return <Navigate to={'/'} replace= {true}></Navigate>
    }
    return children;
}
/** 
export const Roles= ({children})=>{
    const role = useAuthStore.getState().auth.role
    if(role==="Parent" || role==="parent"){
        return <Navigate to={'/ParentDashboard'} replace= {true}></Navigate>
    }
    if(role==="Driver" || role==="driver")
    {
        return <Navigate to={'/vehicles'} replace={true}></Navigate>
    }
    if(role==="Owner" || role==="owner")
    {
        return <Navigate to={'/vehicles'} replace={true}></Navigate>
    }
    if(role!=="Parent" || role!=="parent" || role!=="Driver" || role!=="driver" || role!=="Owner" || role!=="owner")
    {
        return <Navigate to={'/home'} replace={true}></Navigate>
    }
    return children;
}
*/