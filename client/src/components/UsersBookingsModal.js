import React, { useState, forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import UsersBookingsList from "./UsersBookingsList";

const UsersBookingsModal = forwardRef((props, ref) => {
  const [usersBookingsDisplay, setUsersBookingsDisplay] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      toggleModal: () => toggleUsersBookingsDisplay(),
    };
  });

  function toggleUsersBookingsDisplay() {
    setUsersBookingsDisplay(!usersBookingsDisplay);
  }

  if (usersBookingsDisplay) {
    return ReactDOM.createPortal(
      <div className="modal-wrapper__user-bookings">
        <div
          onClick={toggleUsersBookingsDisplay}
          className="modal-backdrop__user-bookings"
        />
        <div className="modal-box__user-bookings">
          <UsersBookingsList />
        </div>
      </div>,
      document.getElementById("modal-root")
    );
  }
  return null;
});

export default UsersBookingsModal;
