import React from "react";
import { useCampground } from "../context/CampgroundContext";
import CampgroundAddModal from "./CampgroundAddModal";
import { useUser } from "../context/UserContext";

export default function AdminAddCampground() {
  const { handleOpenAddCampgroundModal, modalAddRef } = useCampground();

  const { currentUser } = useUser();

  return (
    <>
      {currentUser.email && currentUser.email === "gr.eb@frontier.com" && (
        <>
          <button
            onClick={handleOpenAddCampgroundModal}
            className="button-general"
          >
            Add Campground
          </button>
          <CampgroundAddModal ref={modalAddRef} />
        </>
      )}
    </>
  );
}
