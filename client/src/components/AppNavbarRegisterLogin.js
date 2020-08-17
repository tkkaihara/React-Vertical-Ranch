import React from "react";
import { Link } from "react-scroll";
import { useUser } from "../context/UserContext";
import { NavItem } from "reactstrap";

export default function AppNavbarRegisterLogin(props) {
  const { toggle } = props;
  const { handleAuthModal, setIsRegisterWindow, message, notify } = useUser();

  return (
    <>
      <NavItem>
        <Link
          to="#"
          onClick={() => {
            toggle();
            handleAuthModal();
            setIsRegisterWindow(false);
          }}
          className="auth-link"
        >
          Login
        </Link>
      </NavItem>
      <NavItem>
        <Link
          to="#"
          onClick={() => {
            toggle();
            handleAuthModal();
            setIsRegisterWindow(true);
          }}
          className="auth-link"
        >
          Register
        </Link>
      </NavItem>
    </>
  );
}
