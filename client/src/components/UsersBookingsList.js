import React from "react";
import moment from "moment";
import UserBooking from "./UserBooking";
import { useCampground } from "../context/CampgroundContext";
import { useUser } from "../context/UserContext";

export default function CampgroundEdit() {
  const { handleUsersBookingsModal, allCampgroundBookings } = useCampground();
  const { currentUser } = useUser();

  function usersBookings() {
    if (
      currentUser &&
      allCampgroundBookings &&
      allCampgroundBookings !== null &&
      allCampgroundBookings !== undefined
    ) {
      const currentUserFullName = `${currentUser.first_name} ${currentUser.last_name}`;
      return allCampgroundBookings.map((campground) => {
        console.log(campground);
        let campName = campground.camp_name;
        return campground.camp_bookings.map((booking) => {
          if (
            currentUserFullName === booking.user &&
            moment(Date.now()).isBefore(
              moment(booking.date_range[1]).add(1, "d"),
              "day"
            )
          ) {
            return (
              <UserBooking
                key={booking._id}
                booking={booking}
                campground={campground}
                campName={campName}
              />
            );
          } else {
            return null;
          }
        });
      });
    } else {
      return null;
    }
  }

  return (
    <>
      <div className="header__campground-view-edit">
        <div className="campground-view-header">
          <h1 className="font-weight-300">Your Bookings:</h1>
        </div>
        <button
          onClick={handleUsersBookingsModal}
          className="exit-button-view-edit"
        >
          &times;
        </button>
      </div>
      <div className="form-container__campground-add">
        <div className="bookings-list">
          <div>{usersBookings()}</div>
        </div>
      </div>
    </>
  );
}
