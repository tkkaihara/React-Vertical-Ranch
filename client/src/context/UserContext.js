import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";

const UserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  // Setting Current User
  const [currentUser, setCurrentUser] = useState(null);
  // Setting Current User Token
  const [token, setToken] = useState(
    localStorage.getItem("ACCESS_TOKEN_SECRET")
  );
  // Setting If User is Authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    axios({
      url: "/api/users",
      method: "POST",
      data: newUser,
    })
      .then(() => {
        console.log("New user has been sent to the server");
      })
      .catch(() => {
        console.log("Internal Server Error, new user not saved");
      });

    handleAuthModal();
  }
  // Setup Config/Headers & Token
  function tokenConfig() {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    // If token, add to headers
    if (token) {
      config.headers["x-auth-token"] = token;
    }
  }

  function loadUser() {
    axios({
      url: "/api/auth/user",
      method: "GET",
      data: tokenConfig(),
    })
      .then(() => {
        console.log("New user has been sent to the server");
      })
      .catch(() => {
        console.log("Internal Server Error, new user not saved");
      });

    localStorage.setItem("token", token);
  }

  function handleLogin(input) {
    const loginCredentials = {
      email: input.email,
      password: input.password,
    };
    axios({
      url: "/api/auth",
      method: "POST",
      data: loginCredentials,
    })
      .then((res) => {
        setToken(res.data.token);
        localStorage.setItem("ACCESS_TOKEN_SECRET", res.data.token);
        localStorage.setItem("User", JSON.stringify(res.data.user));
        setCurrentUser(JSON.parse(localStorage.getItem("User")));
        setIsAuthenticated(true);
        console.log("User has been successfully logged in.");
      })
      .catch(() => {
        console.log("Internal Server Error, user not logged in.");
      });
    handleAuthModal();
  }
  function handleLogout() {
    localStorage.removeItem("ACCESS_TOKEN_SECRET");
    localStorage.removeItem("User");
    setIsAuthenticated(false);
    setToken(null);
    setCurrentUser(null);
  }

  const UserContextValue = {
    handleAuthModal,
    handleRegister,
    handleLogin,
    handleLogout,
    setIsRegisterWindow,
    isRegisterWindow,
    isAuthenticated,
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
