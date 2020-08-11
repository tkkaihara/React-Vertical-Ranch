import React, { useState, forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import { useCampground } from "../context/CampgroundContext";
import CampgroundView from "./CampgroundView";
import CampgroundEdit from "./CampgroundEdit";

const CampgroundViewEditModal = forwardRef((props, ref) => {
  const { handleCalendarClear, editWindow } = useCampground();

  const [campgroundViewEditDisplay, setCampgroundViewEditDisplay] = useState(
    false
  );

  useImperativeHandle(ref, () => {
    return {
      toggleModal: () => toggleCampgroundViewEditDisplay(),
    };
  });

  function toggleCampgroundViewEditDisplay() {
    setCampgroundViewEditDisplay(!campgroundViewEditDisplay);
  }

  if (campgroundViewEditDisplay) {
    return ReactDOM.createPortal(
      <div className="modal-wrapper__campground-view-edit">
        <div
          onClick={handleCalendarClear}
          className="modal-backdrop__campground-view-edit"
        />
        <div className="modal-box__campground-view-edit">
          {!editWindow && <CampgroundView />}
          {editWindow && <CampgroundEdit />}
        </div>
      </div>,
      document.getElementById("modal-root")
    );
  }

  return null;
});

export default CampgroundViewEditModal;
