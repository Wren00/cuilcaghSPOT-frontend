import * as React from "react";
import "./css/login.css";
import { LoginForm } from "../components/loginForm";


function UserLogin() {

  return (
    <div className="login-page">
      <h1 className="title">User Login</h1>
      <LoginForm />
    </div>
  );
}

export default UserLogin;
