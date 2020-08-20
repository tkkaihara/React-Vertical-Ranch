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
    <div className="ml-5">
      <div className="lead">
        <div className="booking-outer-grid">
          <div>
            <span className="booking-text-user">{campName}</span>:
          </div>
          <div>
            <span className="booking-text-start-date">{startDate}</span> -{" "}
            <span className="booking-text-end-date">{endDate}</span>
          </div>
          <div>
            <button
              onClick={() => {
                handleBookingDeleteUser(_id, campground._id);
              }}
              className="booking-delete-button"
            >
              &times;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
