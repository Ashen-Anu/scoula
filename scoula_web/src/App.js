import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


/* Importing Components */
import LoginEmail from "./components/login/email";
import Password from "./components/login/password";
import PageNotFound from "./components/pageNotFound";
import PasswordRecover from "./components/passwordRecover";
import Profile from "./components/profile";
import Registration from "./components/registration";
import Reset from "./components/reset";

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
    path: '/Profile',
    element: <AuthorizeUser><Profile /></AuthorizeUser>
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