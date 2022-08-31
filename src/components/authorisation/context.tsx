import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface UserSessionType {
  accessToken?: string;
  refreshToken?: string;
}

export interface AuthContextTypes {
  userSession: UserSessionType;
  updateUserSession: (updatedUser: UserSessionType) => void;
  clearUserToken: () => void;
}

const AuthContext = React.createContext<AuthContextTypes | null>(null);

const AuthProvider: React.FC<any> = ({ children }) => {
  const navigate = useNavigate();
  const initialUser: UserSessionType = {
    accessToken: "",
    refreshToken: "",
  };

  const localStorageTokens: UserSessionType = {
    accessToken: localStorage.getItem("access_token") || "",
    refreshToken: localStorage.getItem("refresh_token") || "",
  };

  const [userSession, setUserSession] = useState<UserSessionType>(
    localStorageTokens || initialUser
  );

  useEffect(() => {
    const currentDateTime = new Date();
    if (userSession.accessToken) {
      const { exp: accessExp }: any = jwt_decode(userSession.accessToken);
      const accessExpiryDateTime = new Date(accessExp * 1000);
      if (currentDateTime > accessExpiryDateTime) {
        if (userSession.refreshToken) {
          const { exp: refreshExp }: any = jwt_decode(userSession.refreshToken);
          const refreshExpiryDateTime = new Date(refreshExp * 1000);
          if (currentDateTime > refreshExpiryDateTime) {
            clearUserToken();
          }
        }
      }
    }
  }, []);
  const updateUserSession = (updatedUser: UserSessionType) => {
    setUserSession(updatedUser);
    localStorage.setItem("access_token", updatedUser.accessToken || "");
    localStorage.setItem("refresh_token", updatedUser.refreshToken || "");
  };
  const clearUserToken = () => {
    setUserSession(initialUser);
    localStorage.clear();
    navigate("/userLogin");
  };

  return (
    <AuthContext.Provider
      value={{ userSession, updateUserSession, clearUserToken }}
    >
      {console.log("userSession", userSession)}
      {children}
    </AuthContext.Provider>
  );
};

export default { AuthContext, AuthProvider };
