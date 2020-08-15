import React from "react";
import { Link } from "react-scroll";
import { useUser } from "../context/UserContext";
import { NavItem } from "reactstrap";

export default function AppNavbarLoggedIn() {
  const { currentUser, handleLogout } = useUser();
  const currentUserName = `${currentUser.first_name} ${currentUser.last_name}`;

  return (
    <>
      <NavItem>
        <Link to="#" className="auth-link">
          <i class="far fa-user user-icon"></i> {currentUserName}
        </Link>
      </NavItem>
      <NavItem>
        <Link to="#" className="auth-link" onClick={handleLogout}>
          Logout
        </Link>
      </NavItem>
    </>
  );
}
