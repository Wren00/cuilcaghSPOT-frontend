import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUser } from "../types/users.types";
import axios from "axios";
import Card from "@mui/material/Card";
import "../pages/css/register.css";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

let password = "";
let confirmPassword = "";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUser>();

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  console.log(errors);

  const onSubmit = (data: any) => {
    //CHECK password and confirmPassword
    console.log(data);
    axios
      .post("http://localhost:5001/api/users/createUser", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };
  return (
    <div>
      <div className="border-line"></div>
      <Card className="register-box">
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column">
            <label>Username</label>
            <input
              className="input-field"
              {...register("userName")}
              minLength={4}
              required={true}
              type="text"
            />
            {errors.userName ? <div>{errors.userName.message}</div> : null}
            <label>Email Address</label>
            <input
              className="input-field"
              {...register("emailAddress")}
              required={true}
              type="email"
            />
            {errors.emailAddress ? (
              <div>{errors.emailAddress.message}</div>
            ) : null}
            <label>Password</label>
            //TODO assign input to password
            <input
              className="input-field"
              {...register("userPassword")}
              minLength={8}
              required={true}
              type="password"
            />
            <label>Confirm Password</label>
            <input
              className="input-field"
              {...register("userPassword")}
              minLength={8}
              required={true}
              type="password"
            />
            <button className="btn" type="submit">
              Register
            </button>
            <h5>
              Already registered? <Link to="../userLogin">LOGIN</Link>
            </h5>
          </Stack>
        </form>
      </Card>
    </div>
  );
};

export { RegisterForm };
