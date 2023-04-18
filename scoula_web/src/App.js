import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


/* Importing Components */
import LoginEmail from "./components/login/email";
import Password from "./components/login/password";
import PageNotFound from "./components/pageNotFound";
import PasswordRecover from "./components/passwordRecover";
import Home from "./components/home";
import Registration from "./components/registration";
import Reset from "./components/reset";
import ParentDashboard from "./components/parent/parentDashboard";
import SearchVehicles from "./components/searchVehicles";
import Location from "./components/parent/location";
import OwnerDashboard from "./components/owner/ownerDashboard";
import DriverRegistration from "./components/owner/driverRegistration";
import AddVehicles from "./components/owner/addvehicles";
import ViewVehicles from "./vehicles";
import StudentEnrol from "./components/parent/studentReg";


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
    path: '/Reset',
    element: <Reset></Reset>
  },
  {
    path: '/parentdashboard',
    element:<AuthorizeUser><ParentDashboard /></AuthorizeUser>
  },
  {
    path:'/searchvehicles',
    element:<AuthorizeUser> < SearchVehicles /> </AuthorizeUser>
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
    path:'/driverregistration',
    element:<AuthorizeUser> < DriverRegistration /> </AuthorizeUser>
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