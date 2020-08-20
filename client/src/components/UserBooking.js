import React from "react";
import moment from "moment";
import { useCampground } from "../context/CampgroundContext";

export default function UserBooking(props) {
  const { booking, campName, campground } = props;
  const { handleBookingDeleteUser } = useCampground();
  const { _id, date_range } = booking;
  const startDate = moment(date_range[0]).format("MMM Do YYYY");
  const endDate = moment(date_range[1]).format("MMM Do YYYY");

  return (
    <>
      <div className="user-booking-outer-grid">
        <div>
          <span className="user-booking-text-user user-booking-text">
            {campName}
          </span>
          :
        </div>
        <div>
          <span className="user-booking-text-start-date user-booking-text">
            {startDate}
          </span>{" "}
          -{" "}
          <span className="user-booking-text-end-date user-booking-text">
            {endDate}
          </span>
        </div>
        <div>
          <button
            onClick={() => {
              handleBookingDeleteUser(_id, campground);
              campground.camp_bookings = campground.camp_bookings.filter(
                (booking) => booking._id !== _id
              );
            }}
            className="booking-delete-button"
          >
            &times;
          </button>
        </div>
      </div>
    </>
  );
}
