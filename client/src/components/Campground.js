import React from "react";
import CampgroundViewEditModal from "./CampgroundViewEditModal";
import { useCampground } from "../context/CampgroundContext";

export default function Campground(campground) {
  const {
    handleCampgroundSelect,
    handleOpenViewEditCampgroundModal,
    modalViewEditRef,
  } = useCampground();

  const { _id, name, image } = campground;

  return (
    <>
      <div className="item">
        <div className="item-image">
          <img src={image} alt="Campground" />
        </div>
        <div className="item-text">
          <div className="item-text-wrap">
            <a
              className="item-text-title"
              href={_id}
              onClick={(event) => {
                event.preventDefault();
                handleCampgroundSelect(_id);
                handleOpenViewEditCampgroundModal();
              }}
            >
              {name}
            </a>
            <CampgroundViewEditModal ref={modalViewEditRef} {...campground} />
          </div>
        </div>
      </div>
    </>
  );
}
