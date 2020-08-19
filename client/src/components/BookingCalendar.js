import React from "react";
import { DateRangePicker } from "react-dates";
import { useCampground } from "../context/CampgroundContext";
import { useUser } from "../context/UserContext";
import { v4 as uuidv4 } from "uuid";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

export default function BookingCalendar() {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    focusedInput,
    setFocusedInput,
    selectedBookings,
  } = useCampground();

  const { currentUser } = useUser();

  // Sorting the generally blocked dates
  function filterNotUsersBookings() {
    let filteredNotUsersBookings = [];
    // console.log("selectedBookings", selectedBookings);
    if (currentUser && selectedBookings !== null) {
      let currentUserFullName = `${currentUser.first_name} ${currentUser.last_name}`;
      selectedBookings.map((booking) => {
        if (booking.user !== currentUserFullName) {
          filteredNotUsersBookings.push(booking);
          console.log("loop", filteredNotUsersBookings);
        } else {
          return undefined;
        }
      });
      console.log("filteredNotUsersBookings", filteredNotUsersBookings);
      return filteredNotUsersBookings;
    }
  }

  function bookedDates() {
    let bookedDates = [];
    let filteredNotUsersBookings = filterNotUsersBookings();
    console.log("bookedDates", filteredNotUsersBookings);
    if (!currentUser && selectedBookings.length > 0) {
      selectedBookings.map((booking) => {
        let range = booking.date_range;
        range = moment.range(range);
        range = Array.from(range.by("days")).map((m) => m.format("YYYY-MM-DD"));
        bookedDates = bookedDates.concat(range);
      });
    } else if (
      currentUser &&
      filteredNotUsersBookings &&
      filteredNotUsersBookings.length > 0
    ) {
      filteredNotUsersBookings.map((booking) => {
        let range = booking.date_range;
        range = moment.range(range);
        range = Array.from(range.by("days")).map((m) => m.format("YYYY-MM-DD"));
        bookedDates = bookedDates.concat(range);
      });
    }
    console.log("final bookedDates", filteredNotUsersBookings);
    return bookedDates;
  }

  function isDayBlocked(day) {
    return bookedDates().some((bookedDay) =>
      moment(bookedDay).isSame(day, "day")
    );
  }

  // Sorting the users' blocked dates

  function filterUsersBookings() {
    let filteredSelectedUsersBookings = [];
    if (currentUser && selectedBookings !== null) {
      let currentUserFullName = `${currentUser.first_name} ${currentUser.last_name}`;
      selectedBookings.map((booking) => {
        if (booking.user === currentUserFullName) {
          filteredSelectedUsersBookings.push(booking);
        } else {
          return null;
        }
      });
      return filteredSelectedUsersBookings;
    }
  }

  function userBookedDates() {
    let userBookedDates = [];
    let filteredSelectedUsersBookings = filterUsersBookings();
    console.log(filteredSelectedUsersBookings);
    if (
      currentUser &&
      selectedBookings !== null &&
      filteredSelectedUsersBookings &&
      filteredSelectedUsersBookings.length > 0
    ) {
      filteredSelectedUsersBookings.map((booking) => {
        let range = booking.date_range;
        range = moment.range(range);
        range = Array.from(range.by("days")).map((m) => m.format("YYYY-MM-DD"));
        userBookedDates = userBookedDates.concat(range);
      });
      console.log("userBookedDates", userBookedDates);
    }
    return userBookedDates;
  }

  userBookedDates();

  function isDayHighlighted(day) {
    return userBookedDates().some((bookedDay) =>
      moment(bookedDay).isSame(day, "day")
    );
  }

  return (
    <div>
      <DateRangePicker
        startDate={startDate}
        startDateId={uuidv4()}
        endDate={endDate}
        endDateId={uuidv4()}
        onDatesChange={({ startDate, endDate }) => {
          setStartDate(startDate);
          setEndDate(endDate);
        }}
        focusedInput={focusedInput}
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
        isDayBlocked={(day) => isDayBlocked(day)}
        isDayHighlighted={(day) => isDayHighlighted(day)}
        minimumNights={0}
        numberOfMonths={1}
        readOnly={true}
      />
    </div>
  );
}
