import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUser } from "../types/users.types";
import axios from "axios";
import Card from "@mui/material/Card";
import "../pages/css/login.css";
import { Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Auth from "./authorisation/context";
import PopUp from "./popup";

const LoginForm = () => {
  const context = React.useContext(Auth.AuthContext);
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>("Test message");
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUser>();

  const toggleOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleClick = () => {
    toggleOpen();
  };

  const onSubmit = (data: any) => {
    axios
      .post("http://localhost:5001/api/auth/userLogin", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setStatus("Successful login! Redirecting...");
        toggleOpen();
        if (context) {
          context.updateUserSession({
            accessToken: response.data[0],
            refreshToken: response.data[1],
          });
        }
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        setStatus("Login details invalid.");
        toggleOpen();
        console.log(error.data);
      });
  };

  return (
    <div>
      <div className="border-line"></div>
      <div>
        {
          <Card>
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
              <Stack direction="column">
                <label>Username</label>
                <input
                  className="input-field"
                  {...register("userName")}
                  required={true}
                  type="text"
                />
                <label>Password</label>
                <input
                  className="input-field"
                  {...register("userPassword")}
                  required={true}
                  type="password"
                />
                <PopUp message={status} open={open} />
                <h5>
                  Don't have an account?{" "}
                  <Link to="../register">Register here</Link>
                </h5>
              </Stack>
            </form>
          </Card>
        }
      </div>
    </div>
  );
};

export { LoginForm };
