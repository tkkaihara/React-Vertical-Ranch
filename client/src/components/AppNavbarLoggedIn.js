import React from "react";
import { Link } from "react-scroll";
import { useUser } from "../context/UserContext";
import { useCampground } from "../context/CampgroundContext";
import { NavItem } from "reactstrap";

export default function AppNavbarLoggedIn(props) {
  const { toggle } = props;
  const { currentUser, handleLogout } = useUser();
  const { handleUsersBookingsModal } = useCampground();
  const currentUserName = `${currentUser.first_name} ${currentUser.last_name}`;

  return (
    <>
      <NavItem>
        <Link
          to="#"
          className="auth-link"
          onClick={() => {
            toggle();
            handleUsersBookingsModal();
          }}
        >
          <i className="far fa-user user-icon"></i> {currentUserName}
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
