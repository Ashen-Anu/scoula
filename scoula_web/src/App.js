import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


/* Importing Components */
import LoginEmail from "./components/parent/login/email";
import Password from "./components/parent/login/password";
import PageNotFound from "./components/pageNotFound";
import PasswordRecover from "./components/passwordRecover";
import Home from "./components/home";
import Registration from "./components/registration";
import Reset from "./components/reset";
import ParentDashboard from "./components/parent/parentDashboard";
import Aboutus from "./components/aboutus";
import Location from "./components/parent/location";
import OwnerDashboard from "./components/owner/ownerDashboard";
import AddVehicles from "./components/owner/addvehicles";
import ViewVehicles from "./vehicles";
import StudentEnrol from "./components/parent/studentReg";
import OwnerLoginEmail from "./components/owner/login/email";
import OwnerPassword from "./components/owner/login/password";
import OwnerRegistration from "./components/owner/registration";

/* Auth Middleware */
import { AuthorizeUser, ProtectRoute } from "./middleware/auth";




/* root routes */
const router= createBrowserRouter([
  {
    path: '/',
    element: <LoginEmail></LoginEmail>
  },
  {
    path: '/password',
    element: <ProtectRoute><Password/></ProtectRoute>
  },
  {
    path: '/PasswordRecover',
    element: <PasswordRecover></PasswordRecover>
  },
  {
    path: '/Home',
    element: <AuthorizeUser><Home /></AuthorizeUser>
  },
  {
    path: '/Registration',
    element: <Registration></Registration>
  },
  {
    path: '/ownerregistration',
    element: <OwnerRegistration></OwnerRegistration>
  },
  {
    path: '/Reset',
    element: <Reset></Reset>
  },
  {
    path: '/parentdashboard',
    element:<AuthorizeUser><ParentDashboard /></AuthorizeUser>
  },
  {
    path:'/aboutus',
    element:<AuthorizeUser> <Aboutus/> </AuthorizeUser>
  },
  {
    path:'/location',
    element:<AuthorizeUser> < Location /> </AuthorizeUser>
  },
  {
    path:'/ownerdashboard',
    element:<AuthorizeUser> < OwnerDashboard /> </AuthorizeUser>
  },
  {
    path:'/addvehicles',
    element:<AuthorizeUser> < AddVehicles /> </AuthorizeUser>
  },
  {
    path:'/viewvehicles',
    element:<AuthorizeUser> < ViewVehicles /> </AuthorizeUser>
  },
  {
    path: '/ownerLoginEmail',
    element:<OwnerLoginEmail></OwnerLoginEmail>
  },
  {
    path: 'ownerPassword',
    element:<ProtectRoute><OwnerPassword></OwnerPassword></ProtectRoute>
  },
  {
    path:'/studentreg',
    element:<AuthorizeUser> < StudentEnrol /> </AuthorizeUser>
  },
  {
    path: '*',
    element: <PageNotFound></PageNotFound>
  },
])

export default function App(){
  return(
    <main>
    <RouterProvider router={router}></RouterProvider>
    </main>
  )
}