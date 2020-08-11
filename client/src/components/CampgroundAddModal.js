import React, { useState, forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import AddCampgroundForm from "./AddCampgroundForm";

const CampgroundAddModal = forwardRef((props, ref) => {
  const [campgroundAddDisplay, setCampgroundAddDisplay] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      toggleModal: () => toggleDisplay(),
    };
  });

  function toggleDisplay() {
    setCampgroundAddDisplay(!campgroundAddDisplay);
  }

  if (campgroundAddDisplay) {
    return ReactDOM.createPortal(
      <div className="modal-wrapper__campground-add">
        <div
          onClick={toggleDisplay}
          className="modal-backdrop__campground-add"
        />
        <div className="modal-box__campground-add">
          <div className="header__campground-add">
            <h1>Add a Campground</h1>
            <button onClick={toggleDisplay} className="exit-button">
              &times;
            </button>
          </div>
          <div className="form-container__campground-add">
            <AddCampgroundForm />
          </div>
        </div>
      </div>,
      document.getElementById("modal-root")
    );
  }

  return null;
});

export default CampgroundAddModal;
