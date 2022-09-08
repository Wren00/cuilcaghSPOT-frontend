import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUser } from "../types/users.types";
import Card from "@mui/material/Card";
import "../pages/css/register.css";
import { Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Auth from "./authorisation/context";
import RegistrationPopUp from "./popups/registrationPopup";
import { ApiClient } from "../utils";

const RegisterForm = () => {
  const context = React.useContext(Auth.AuthContext);
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>("");
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUser>();

  const [password, setPassword] = useState<string>(" ");
  const [matchPassword, setMatchPassword] = useState<string>(" ");

  const checkPassword = (password: string, matchPassword: string) => {
    return !!password.match(matchPassword);
  };

  const onSubmit = (data: any) => {
    setStatus("");
    if (checkPassword(password, matchPassword)) {
      ApiClient.post("users/createUser", data, {
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          setStatus("Welcome, you can now login! Redirecting...");
          console.log({ status });
          setTimeout(() => {
            navigate("/userLogin");
          }, 2000);
        })
        .catch((error) => {
          setStatus("Error, please try again.");
          console.log(error.data);
        });
    } else {
      setStatus("Details invalid, please try again.");
    }
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
            <label htmlFor="password">Password</label>
            <input
              className="input-field"
              {...register("userPassword")}
              minLength={8}
              required={true}
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setPassword(e.target.value)
              }
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="input-field"
              minLength={8}
              required={true}
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setMatchPassword(e.target.value)
              }
            />
            <RegistrationPopUp message={status} open={open} setOpen={setOpen} />
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
