import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUser } from "../types/users.types";
import axios from "axios";
import Card from "@mui/material/Card";
import "../pages/css/login.css";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [message, setMessage] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUser>();

  const toggleModal = () => {
    setIsModalVisible((wasModalVisible) => !wasModalVisible);
    console.log(isModalVisible);
  };

  const onBackdropClick = () => {
    setIsModalVisible(false);
  };

  const onSubmit = (data: any) => {
    axios
      .post("http://localhost:5001/api/auth/userLogin", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setMessage("success");
        console.log(message);
        console.log(response.data);
      })
      .catch((error) => {
        setMessage("fail");
        console.log(message);
        console.log(error.data);
      });
  };
  return (
    <div>
      <div className="border-line"></div>
      <div>
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
              <button className="btn" type="submit">
                Log In
              </button>
              <h5>
                Don't have an account?{" "}
                <Link to="../register">Register here</Link>
              </h5>
            </Stack>
          </form>
          <button onClick={toggleModal}>Show modal</button>
          <div className="modal-root"></div>
        </Card>
      </div>
    </div>
  );
};

export { LoginForm };
