import React from "react";
import { useUser } from "../context/UserContext";
import { useCampground } from "../context/CampgroundContext";

export default function AdminEditDeleteCampground() {
  const { currentUser } = useUser();
  const {
    handleCampgroundDelete,
    handleEditWindow,
    selectedCampgroundId,
  } = useCampground();

  return (
    <>
      {currentUser.email && currentUser.email === "gr.eb@frontier.com" && (
        <>
          <button
            className="campground-view-edit-button"
            onClick={handleEditWindow}
          >
            Edit
          </button>
          <button
            className="campground-view-button-delete"
            onClick={() => handleCampgroundDelete(selectedCampgroundId)}
          >
            Delete
          </button>
        </>
      )}
    </>
  );
}
