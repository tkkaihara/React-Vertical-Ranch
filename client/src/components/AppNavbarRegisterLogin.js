import React from "react";
import { Link } from "react-scroll";
import { useUser } from "../context/UserContext";
import { NavItem } from "reactstrap";

export default function AppNavbarRegisterLogin() {
  const { handleAuthModal, setIsRegisterWindow } = useUser();

  return (
    <>
      <NavItem>
        <Link
          to="#"
          onClick={() => {
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
