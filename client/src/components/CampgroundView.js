import React from "react";
import { useCampground } from "../context/CampgroundContext";
import BookingCalendar from "./BookingCalendar";
import { useUser } from "../context/UserContext";
import AdminEditDeleteCampground from "../components/AdminEditDeleteCampground";

export default function CampgroundView() {
  const {
    selectedCampground,
    handleCalendarBook,
    handleCalendarClear,
  } = useCampground();

  const { currentUser } = useUser();

  return (
    <>
      <div className="header__campground-view-edit">
        <div className="campground-view-header">
          <h1 className="font-weight-300">{selectedCampground.name}</h1>
          {currentUser && <AdminEditDeleteCampground />}
        </div>
        <button onClick={handleCalendarClear} className="exit-button-view-edit">
          &times;
        </button>
      </div>
      <div className="form-container__campground-add">
        <p className="mt-2 font-weight-300 font-size-1_3">
          Price: ${selectedCampground.price}
        </p>
        <p className="mt-2 font-weight-300 font-size-1_3">
          Description: {selectedCampground.description}
        </p>
        <p className="mt-2 font-weight-300 font-size-1_3">Calendar:</p>
        <BookingCalendar />
        <div className="confirm-button-container">
          <button
            onClick={handleCalendarBook}
            className="campground-view-edit-button-confirm"
          >
            Book
          </button>
        </div>
      </div>
    </>
  );
}
