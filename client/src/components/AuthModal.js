import React, { useState, forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import { useUser } from "../context/UserContext";
import Login from "./Login";
import Register from "./Register";

const AuthModal = forwardRef((props, ref) => {
  const { handleAuthModal, isRegisterWindow } = useUser();

  const [authDisplay, setAuthDisplay] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      toggleModal: () => toggleAuthDisplay(),
    };
  });

  function toggleAuthDisplay() {
    setAuthDisplay(!authDisplay);
  }

  if (authDisplay) {
    return ReactDOM.createPortal(
      <div className="modal-wrapper__campground-view-edit">
        <div
          onClick={handleAuthModal}
          className="modal-backdrop__campground-view-edit"
        />
        {!isRegisterWindow && <Login />}
        {isRegisterWindow && <Register />}
      </div>,
      document.getElementById("modal-root")
    );
  }

  return null;
});

export default AuthModal;
