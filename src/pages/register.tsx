import * as React from "react";
import { RegisterForm } from "../components/registerForm";
import "../pages/css/register.css";

function Register() {
  return (
    <div className="register-page">
      <h1 className="title">Sign Up to help this project!</h1>
      <RegisterForm />
    </div>
  );
}

export default Register;
