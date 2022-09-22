import { Grid } from "@mui/material";
import "../pages/css/settings.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import { User } from "../types/users.types";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import * as React from "react";
import Auth from "./authorisation/context";
import { ApiClient } from "../utils";
import { wait } from "@testing-library/user-event/dist/utils";

const UserSettings = () => {
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>("");
  const [matchPassword, setMatchPassword] = useState<string>(" ");
  const [showUsername, setShowUsername] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");

  let { id } = useParams();
  let parsedId: number = 0;
  let tokenId: number = 0;
  let isLoggedIn: boolean = false;

  const context = React.useContext(Auth.AuthContext);
  const token = context?.userSession.accessToken;

  if (id) {
    parsedId = parseInt(id);
  }

  if (token) {
    const decodedToken = jwtDecode<any>(token);
    tokenId = parseInt(decodedToken.userId);
  }

  if (tokenId === parsedId) {
    isLoggedIn = true;
  }

  const checkPassword = (password: string, matchPassword: string) => {
    return !!password.match(matchPassword);
  };

  //CHANGE USERNAME

  const updateUserName = () => {
    let data: any = {
      userId: tokenId,
      userName: username,
    };
    console.log(data);

    ApiClient.put("users/updateUserDetails", data, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setStatus("Username change successful!");
        console.log({ status });
      })
      .catch((error) => {
        setStatus("Error, please try again.");
        console.log(error.data);
      });
  };

  //CHANGE EMAIL

  const updateUserEmail = () => {
    let data: any = {
      userId: tokenId,
      emailAddress: email,
    };
    console.log(data);
    setStatus("Email change successful!");

    ApiClient.put("users/updateUserDetails", data, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log({ status });
      })
      .catch((error) => {
        setStatus("Error, please try again.");
        console.log(error.data);
      });
  };

  //CHANGE PASSWORD

  const updatePassword = (password: string, matchPassword: string) => {
    setStatus("");
    if (checkPassword(password, matchPassword)) {
      let data: any = {
        userId: tokenId,
        userPassword: password,
      };

      ApiClient.put("users/updateUserPassword", data, {
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          setStatus("Password changed.");
          console.log(status);
        })
        .catch((error) => {
          setStatus("Error, please try again.");
        });
    } else {
      setStatus("Details invalid, please try again.");
    }
  };

  return (
    <div className="settings-menu">
      {isLoggedIn && (
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12}>
            <div className="settings-title">Change Your Settings</div>
          </Grid>
          <Grid item xs={12} sm={12}>
            <div>
              <Button
                variant="contained"
                color="secondary"
                disableElevation
                onClick={() => setShowUsername(true)}
              >
                Change Username
              </Button>
              {showUsername && (
                <div className="username-change">
                  <Grid item> Enter your new username (must be unique)</Grid>
                  <Grid item>
                    {" "}
                    <input
                      onChange={(
                        e: React.ChangeEvent<HTMLInputElement>
                      ): void => setUsername(e.target.value)}
                    />
                    <Button onClick={updateUserName}>Submit</Button>
                    <Button onClick={() => setShowUsername(false)}>
                      Cancel
                    </Button>
                  </Grid>
                </div>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={12}>
            {" "}
            <div>
              {" "}
              <Button
                variant="contained"
                color="secondary"
                disableElevation
                onClick={() => setShowPassword(true)}
              >
                Change Password
              </Button>
              {showPassword && (
                <div className="password-change">
                  <form>
                    <Grid item xs={12} sm={6}>
                      {" "}
                      Enter your new password.
                    </Grid>
                    <input
                      type="password"
                      autoComplete="on"
                      onChange={(
                        e: React.ChangeEvent<HTMLInputElement>
                      ): void => setPassword(e.target.value)}
                    />
                    <div>
                      <Grid item xs={12} sm={6}>
                        {" "}
                        Confirm your new password.
                      </Grid>
                      <input
                        type="password"
                        autoComplete="on"
                        onChange={(
                          e: React.ChangeEvent<HTMLInputElement>
                        ): void => setMatchPassword(e.target.value)}
                      />
                    </div>
                    <Button
                      onClick={() => updatePassword(password, matchPassword)}
                    >
                      Submit
                    </Button>
                    <Button onClick={() => setShowPassword(false)}>
                      Cancel
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={12}>
            {" "}
            <div>
              {" "}
              <Button
                variant="contained"
                color="secondary"
                disableElevation
                onClick={() => setShowEmail(true)}
              >
                Change Email
              </Button>
              {showEmail && (
                <div className="email-change">
                  <Grid item xs={12} sm={6}>
                    {" "}
                    Enter your new email.
                  </Grid>{" "}
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                      setEmail(e.target.value)
                    }
                  />
                  <Button onClick={updateUserEmail}>Submit</Button>
                  <Button onClick={() => setShowEmail(false)}>Cancel</Button>
                </div>
              )}
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default UserSettings;
