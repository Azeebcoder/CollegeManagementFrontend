import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import VerifyOtp from './pages/VerifyOtp.jsx';
import { ToastContainer } from 'react-toastify';
import UserDetails from './pages/UserDetails.jsx';
import ForgetPassword from './pages/ForgetPassword.jsx';
import UpdateProfile from './pages/UpdateProfile.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<SignUp/>} />
        <Route path="/verify-otp" element={<VerifyOtp/>} />
        <Route path="/forget-password" element={<ForgetPassword/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/update-profile" element={<UpdateProfile/>} />
        <Route path="/user/:id" element={<UserDetails/>} />
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  )
}

export default App