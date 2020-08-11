import React, { useState } from "react";
import { Link } from "react-scroll";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";

export default function AppNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar scrolling="true" dark expand="md" className="main-nav">
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
              <Link to="landing" smooth={true} duration={800}>
                Home
              </Link>
            </NavItem>
            <NavItem>
              <Link to="campgrounds" smooth={true} duration={800}>
                Campgrounds
              </Link>
            </NavItem>
            <NavItem>
              <Link to="information" smooth={true} duration={800}>
                Information
              </Link>
            </NavItem>
            <NavItem>
              <Link to="contact" smooth={true} duration={800}>
                Contact
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
}
