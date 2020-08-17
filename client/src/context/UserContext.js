import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
const UserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  // Setting Current User
  const [currentUser, setCurrentUser] = useState(null);
  // Setting Current User Token
  const [token, setToken] = useState(localStorage.getItem("token"));
  // Setting If Register or Login Sub-Modal Displays
  const [isRegisterWindow, setIsRegisterWindow] = useState(true);

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("User")));
  }, []);

  const modalAuthRef = useRef();
  // Modals Opening/Closing
  function handleAuthModal() {
    modalAuthRef.current.toggleModal();
  }
  // User Registration
  function handleRegister(input) {
    const newUser = {
      first_name: input.first_name,
      last_name: input.last_name,
      email: input.email,
      password: input.password,
    };
    const currentToken = localStorage.getItem("token");
    axios({
      url: "/api/users",
      method: "POST",
      data: newUser,
      headers: {
        "x-auth-token": `${currentToken}`,
      },
    })
      .then((res) => {
        console.log("New user has been sent to the server");
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("User", JSON.stringify(res.data.user));
        setCurrentUser(JSON.parse(localStorage.getItem("User")));
        console.log("User has been successfully logged in.");
      })
      .catch(() => {
        console.log("Internal Server Error, new user not saved");
      });

    handleAuthModal();
  }

  function handleLogin(input) {
    const loginCredentials = {
      email: input.email,
      password: input.password,
    };
    const currentToken = localStorage.getItem("token");
    axios({
      url: "/api/auth",
      method: "POST",
      data: loginCredentials,
      headers: {
        "x-auth-token": `${currentToken}`,
      },
    })
      .then((res) => {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("User", JSON.stringify(res.data.user));
        setCurrentUser(JSON.parse(localStorage.getItem("User")));
        console.log("User has been successfully logged in.");
      })
      .catch(() => {
        console.log("Internal Server Error, user not logged in.");
      });
    handleAuthModal();
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("User");
    setToken(null);
    setCurrentUser(null);
  }

  function handleAuth() {
    const currentToken = localStorage.getItem("token");
    // Check for token
    if (!token) {
      console.log("Please login or register...");
    } else {
      // Verify token
      axios({
        url: "/api/auth/user",
        method: "GET",
        headers: {
          "x-auth-token": `${currentToken}`,
        },
      })
        .then(() => {
          return console.log("User token is valid...");
        })
        .catch(() => {
          handleLogout();
          return console.log("Token expired, please login...");
        });
    }
  }

  const UserContextValue = {
    handleAuthModal,
    handleRegister,
    handleLogin,
    handleLogout,
    handleAuth,
    setIsRegisterWindow,
    isRegisterWindow,
    modalAuthRef,
    currentUser,
    setCurrentUser,
    token,
  };

  return (
    <UserContext.Provider value={UserContextValue}>
      {children}
    </UserContext.Provider>
  );
}
