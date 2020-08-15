import React from "react";
import { useUser } from "../context/UserContext";
import { useForm } from "react-hook-form";

export default function Login() {
  const { handleAuthModal, handleLogin } = useUser();

  const { handleSubmit, register } = useForm();

  return (
    <>
      <div className="modal-box__campground-login">
        <div className="header__campground-view-edit">
          <div className="campground-view-header">
            <h1 className="font-weight-300">Login</h1>
          </div>
          <button onClick={handleAuthModal} className="exit-button-view-edit">
            &times;
          </button>
          <form onSubmit={handleSubmit(handleLogin)} className="ml-3">
            <h6 className="pt-3">Email</h6>
            <input
              ref={register({ required: "Required" })}
              type="text"
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
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
