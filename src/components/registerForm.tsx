import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUser } from "../types/users.types";
import axios from "axios";
import Card from "@mui/material/Card";
import "../pages/css/register.css";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import Popup from "./popup";

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUser>();

  const [password, setPassword] = useState<string>(" ");
  const [matchPassword, setMatchPassword] = useState<string>(" ");

  const [modal, setModal] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible((wasModalVisible) => !wasModalVisible);
  };

  const checkPassword = (password: string, matchPassword: string) => {
    return !!password.match(matchPassword);
  };

  const onSubmit = (data: any) => {
    if (checkPassword(password, matchPassword)) {
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
            <button className="btn" type="submit" onClick={toggleModal}>
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
