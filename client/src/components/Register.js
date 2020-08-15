import React from "react";
import { useUser } from "../context/UserContext";
import { useForm } from "react-hook-form";

export default function Register() {
  const { handleAuthModal, handleRegister } = useUser();

  const { handleSubmit, register } = useForm();

  return (
    <>
      <div className="modal-box__campground-register">
        <div className="header__campground-view-edit">
          <div className="campground-view-header">
            <h1 className="font-weight-300">Register</h1>
          </div>
          <button onClick={handleAuthModal} className="exit-button-view-edit">
            &times;
          </button>
          <form onSubmit={handleSubmit(handleRegister)} className="ml-3">
            <h6 className="pt-3">First Name</h6>
            <input
              ref={register({ required: "Required" })}
              type="text"
              name="first_name"
              placeholder="First Name"
              className="input__campground-add"
            />
            <h6 className="pt-3">Last Name</h6>
            <input
              ref={register({ required: "Required" })}
              type="text"
              name="last_name"
              placeholder="Last Name"
              className="input__campground-add"
            />
            <h6 className="pt-3">Email</h6>
            <input
              ref={register({ required: "Required" })}
              type="email"
              name="email"
              placeholder="Email"
              className="input__campground-add"
            />
            <h6 className="pt-3">Password</h6>
            <input
              ref={register({ required: "Required" })}
              type="password"
              name="password"
              placeholder="Password"
              className="input__campground-add"
            />
            <div className="navbar-confirm-button-container">
              <button type="submit" className="navbar-confirm">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
