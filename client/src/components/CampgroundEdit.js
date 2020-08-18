import React from "react";
import { useCampground } from "../context/CampgroundContext";
import { useForm } from "react-hook-form";
import BookingsList from "./BookingsList";

export default function CampgroundEdit() {
  const {
    selectedCampground,
    selectedCampgroundId,
    handleCampgroundChange,
    handleCalendarClear,
    handleCampgroundDelete,
    handleEditWindow,
  } = useCampground();

  const { handleSubmit, register } = useForm();

  function handleChange(changes) {
    handleCampgroundChange(selectedCampgroundId, {
      ...selectedCampground,
      ...changes,
    });
  }

  return (
    <>
      <div className="header__campground-view-edit">
        <div className="campground-view-header">
          <h1 className="font-weight-300">{selectedCampground.name}</h1>
          <button
            className="campground-view-edit-button"
            onClick={handleEditWindow}
          >
            Edit
          </button>
          <button
            className="campground-view-button-delete"
            onClick={() => handleCampgroundDelete(selectedCampgroundId)}
          >
            Delete
          </button>
        </div>
        <button onClick={handleCalendarClear} className="exit-button-view-edit">
          &times;
        </button>
      </div>
      <div className="form-container__campground-add">
        <form onSubmit={handleSubmit(handleEditWindow)}>
          <h6 className="pt-2">Name</h6>
          <input
            ref={register({ required: "Required" })}
            type="text"
            name="name"
            value={selectedCampground.name}
            onChange={(e) => handleChange({ name: e.target.value })}
            className="input__campground-add"
          />
          <h6 className="pt-3">Image</h6>
          <input
            ref={register({ required: "Required" })}
            type="text"
            name="image"
            value={selectedCampground.image}
            onChange={(e) => handleChange({ image: e.target.value })}
            className="input__campground-add"
          />
          <h6 className="pt-3">Price/Night</h6>
          <input
            ref={register({ required: "Required" })}
            type="text"
            name="price"
            value={selectedCampground.price}
            onChange={(e) => handleChange({ price: e.target.value })}
            className="input__campground-add"
          />
          <h6 className="pt-3">Description</h6>
          <textarea
            ref={register({ required: "Required" })}
            name="description"
            value={selectedCampground.description}
            onChange={(e) => handleChange({ description: e.target.value })}
            cols="40"
            rows="5"
            className="input__campground-add"
          />
          <div className="confirm-button-container">
            <button
              type="submit"
              className="campground-view-edit-button-confirm"
            >
              Save Changes
            </button>
          </div>
        </form>
        <div className="bookings-list">
          <BookingsList />
        </div>
      </div>
    </>
  );
}
