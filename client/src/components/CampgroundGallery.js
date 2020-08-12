import React from "react";
import Campground from "./Campground";
import CampgroundAddModal from "./CampgroundAddModal";
import { useCampground } from "../context/CampgroundContext";

export default function CampgroundGallery() {
  const {
    campgrounds,
    handleOpenAddCampgroundModal,
    modalAddRef,
  } = useCampground();

  return (
    <div id="campgrounds">
      <div>
        <section className="home-a-background">
          <div className="container">
            <section className="text-center py-2 home-a">
              <h2 className="section-title">Our Campsites</h2>
              <div className="bottom-line" />
              <p className="lead">
                Each of our campsites are graded and have access to potable
                water and view of Davis Peak. Other amenities include a toilet,
                parking spots in the main camp, and a campfire.
              </p>
              <div className="gallery">
                <div className="items">
                  {campgrounds.map((campground) => {
                    return <Campground key={campground._id} {...campground} />;
                  })}
                </div>
                <div className="mt-5">
                  <button
                    onClick={handleOpenAddCampgroundModal}
                    className="button-general"
                  >
                    Add Campground
                  </button>
                  <CampgroundAddModal ref={modalAddRef} />
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
