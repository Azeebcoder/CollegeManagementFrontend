import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import ResetPassword from './pages/ResetPassword.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<SignUp/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App