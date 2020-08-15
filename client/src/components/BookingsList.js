import React from "react";
import { useCampground } from "../context/CampgroundContext";
import Booking from "./Booking";
import moment from "moment";

export default function BookingsList() {
  const { selectedCampground, selectedBookings } = useCampground();
  const { name } = selectedCampground;

  return (
    <>
      <div>
        <p className="lead font-size-1_5 font-weight-300">{name} Bookings:</p>
        {selectedBookings.map((booking) => {
          if (
            moment(Date.now()).isBefore(
              moment(booking.date_range[1]).add(1, "d"),
              "day"
            )
          ) {
            return <Booking key={booking._id} {...booking} />;
          } else {
            return null;
          }
        })}
      </div>
    </>
  );
}
