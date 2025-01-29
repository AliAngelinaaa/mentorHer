// src/pages/Login.jsx
import React from 'react';
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import {useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate()
  return (
    <div>
      <h2>Login</h2>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
        console.log(credentialResponse)
        console.log(jwtDecode(credentialResponse.credential))
        navigate("/dashboard")
      }}
      onError={() => console.log("Login failed")}/>

      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
