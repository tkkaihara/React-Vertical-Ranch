import React from "react";
import { useCampground } from "../context/CampgroundContext";
import { useForm } from "react-hook-form";

export default function AddCampgroundForm() {
  const { handleCampgroundAdd } = useCampground();
  const { handleSubmit, register } = useForm();

  return (
    <>
      <form onSubmit={handleSubmit(handleCampgroundAdd)}>
        <h6 className="pt-2">Name</h6>
        <input
          ref={register({ required: "Required" })}
          type="text"
          name="name"
          placeholder="Name"
          className="input__campground-add"
        />
        <h6 className="pt-3">Image</h6>
        <input
          ref={register({ required: "Required" })}
          type="text"
          name="image"
          placeholder="Image URL"
          className="input__campground-add"
        />
        <h6 className="pt-3">Price</h6>
        <input
          ref={register({ required: "Required" })}
          type="text"
          name="price"
          placeholder="Price/Night"
          className="input__campground-add"
        />
        <h6 className="pt-3">Description</h6>
        <textarea
          ref={register({ required: "Required" })}
          name="description"
          cols="40"
          rows="5"
          placeholder="Description"
          className="input__campground-add"
        />
        <div className="pt-2">
          <button type="submit" className="button-general">
            Create
          </button>
        </div>
      </form>
    </>
  );
}
