import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUser } from "../types/users.types";
import axios from "axios";
import Card from "@mui/material/Card";
import "../pages/css/login.css";
import { Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Auth from "./authorisation/context";
import PopUp from "./popups/popup";

const LoginForm = () => {
  const context = React.useContext(Auth.AuthContext);
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>("");
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUser>();

  /* Dont need the below snippet, open and the click is handled within the PopUp class

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
  */

  const onSubmit = (data: any) => {
    //Reset status back to empty string otherwise the previous status may show for a split second before it updates
    setStatus("");
    axios
      .post("http://localhost:5001/api/auth/userLogin", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setStatus("Successful login! Redirecting...");
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
                {
                  //Pass down setOpen as a prop, means we can use a single state for all open handling
                }
                <PopUp message={status} open={open} setOpen={setOpen} />
                <h5>
                  Don't have an account?
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
