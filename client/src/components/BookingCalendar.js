import React from "react";
import { DateRangePicker } from "react-dates";
import { useCampground } from "../context/CampgroundContext";
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

  function bookedDates() {
    let bookedDates = [];
    if (selectedBookings.length > 0) {
      for (let i = 0; i < selectedBookings.length; i++) {
        let range = selectedBookings[i].date_range;
        range = moment.range(range);
        range = Array.from(range.by("days")).map((m) => m.format("YYYY-MM-DD"));
        bookedDates = bookedDates.concat(range);
      }
    }
    return bookedDates;
  }

  function isDayBlocked(day) {
    return bookedDates().some((bookedDay) =>
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
        minimumNights={0}
      />
    </div>
  );
}
