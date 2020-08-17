import React, { useState } from "react";
import { Link } from "react-scroll";
import { useUser } from "../context/UserContext";
import AuthModal from "./AuthModal";
import AppNavbarRegisterLogin from "./AppNavbarRegisterLogin";
import AppNavbarLoggedIn from "./AppNavbarLoggedIn";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";

export default function AppNavbar() {
  const { modalAuthRef, currentUser } = useUser();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  function mobileToggle() {
    if (window.outerWidth <= 991) {
      toggle();
    }
  }

  return (
    <>
      <Navbar scrolling="true" dark expand="lg" className="main-nav">
        <Link
          to="landing"
          smooth={true}
          duration={800}
          className="white-font navbar-brand"
        >
          <img className="navbar-logo" src="logo/logo_white.png" alt="logo" />
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="white-font">
          <Nav className="mr-auto navbar" navbar>
            <NavItem>
              <Link
                to="landing"
                onClick={mobileToggle}
                smooth={true}
                duration={800}
              >
                Home
              </Link>
            </NavItem>
            <NavItem>
              <Link
                to="campgrounds"
                onClick={mobileToggle}
                smooth={true}
                duration={800}
              >
                Campgrounds
              </Link>
            </NavItem>
            <NavItem>
              <Link
                to="information"
                onClick={mobileToggle}
                smooth={true}
                duration={800}
              >
                Information
              </Link>
            </NavItem>
            <NavItem>
              <Link
                to="contact"
                onClick={mobileToggle}
                smooth={true}
                duration={800}
              >
                Contact
              </Link>
            </NavItem>
          </Nav>
          <Nav className="justify-content-end navbar" navbar>
            {!currentUser && <AppNavbarRegisterLogin toggle={mobileToggle} />}
            {currentUser && <AppNavbarLoggedIn />}
          </Nav>
          <div className="navbar-right-push"></div>
        </Collapse>
      </Navbar>

      <AuthModal ref={modalAuthRef} />
    </>
  );
}
