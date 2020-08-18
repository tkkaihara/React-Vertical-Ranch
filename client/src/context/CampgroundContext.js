import React, { useContext, useState, useEffect, useRef } from "react";
import moment from "moment";
import axios from "axios";
import { useUser } from "./UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CampgroundContext = React.createContext();

export function useCampground() {
  return useContext(CampgroundContext);
}

export function CampgroundProvider({ children }) {
  // Importing Current User from User Context
  const { currentUser, handleAuth } = useUser();

  // Setting Campgrounds Array State
  const [campgrounds, setCampgrounds] = useState([]);
  // Setting Selected Campground Index in Array
  const [selectedCampgroundIndex, setSelectedCampgroundIndex] = useState(
    undefined
  );
  // Setting Selected Campground Id
  const [selectedCampgroundId, setSelectedCampgroundId] = useState(null);

  let selectedCampground = campgrounds[selectedCampgroundIndex];
  // Selected Bookings
  const [selectedBookings, setSelectedBookings] = useState(null);
  // Setting If Edit is Visbile
  const [editWindow, setEditWindow] = useState(false);
  // Setting Calendar Start Date
  const [startDate, setStartDate] = useState(null);
  // Setting Calendar End Date
  const [endDate, setEndDate] = useState(null);
  // Setting Focused Input
  const [focusedInput, setFocusedInput] = useState([startDate, endDate]);
  // Setting Ref for Modals
  const modalAddRef = useRef();
  const modalViewEditRef = useRef();
  // Retrieving Campground Data from MongoDB
  useEffect(() => {
    const campgroundData = async () => {
      await axios({
        url: "/api/campgrounds/",
        method: "GET",
        data: campgrounds,
      })
        .then((res) => {
          if (campgrounds != null) setCampgrounds(res.data);
          console.log("Data has been retrieved from the server");
        })
        .catch(() => {
          console.log("Internal Server Error");
        });
    };
    campgroundData();
    let retrievedSelectedBookings = retrieveBookings();
    setSelectedBookings(retrievedSelectedBookings);
  }, [selectedCampgroundId]);

  // Check User Authentication whenever state(s) change
  useEffect(() => {
    handleAuth();
  }, [
    currentUser,
    handleBookingDelete,
    handleCalendarBook,
    handleCalendarClear,
    handleCampgroundAdd,
    handleCampgroundSelect,
    handleCampgroundChange,
    handleCampgroundDelete,
    handleEditWindow,
    handleOpenAddCampgroundModal,
    handleOpenViewEditCampgroundModal,
  ]);

  // Handle Campground Add
  function handleCampgroundAdd(input) {
    const newCampground = {
      name: input.name,
      image: input.image,
      price: input.price,
      description: input.description,
    };
    const currentToken = localStorage.getItem("token");
    axios({
      url: "/api/campgrounds/",
      method: "POST",
      data: newCampground,
      headers: {
        "x-auth-token": `${currentToken}`,
      },
    })
      .then(() => {
        toast.success("New campground added!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(() => {
        toast.error("Error, campground not added...", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    setCampgrounds([...campgrounds, newCampground]);
    handleOpenAddCampgroundModal();
  }
  // Handle Campground Selection
  function handleCampgroundSelect(id) {
    const campgroundIndex = campgrounds.findIndex((c) => c._id === id);
    setSelectedCampgroundIndex(campgroundIndex);
    setSelectedCampgroundId(id);
  }
  // Handle Campground Changes
  function handleCampgroundChange(id, campground) {
    const newCampgrounds = [...campgrounds];
    const index = newCampgrounds.findIndex((c) => c._id === id);
    newCampgrounds[index] = campground;
    setCampgrounds(newCampgrounds);
    const currentToken = localStorage.getItem("token");
    axios({
      url: `/api/campgrounds/${id}`,
      method: "PUT",
      data: campground,
      headers: {
        "x-auth-token": `${currentToken}`,
      },
    })
      .then(() => {
        console.log("Campground updated!");
      })
      .catch(() => {
        toast.error("Error, campground not updated...", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }
  // Handle Campground Delete
  function handleCampgroundDelete(selectedCampgroundId) {
    setSelectedBookings(null);
    setCampgrounds(
      campgrounds.filter(
        (campground) => campground._id !== selectedCampgroundId
      )
    );
    const currentToken = localStorage.getItem("token");
    axios({
      url: `/api/campgrounds/${selectedCampgroundId}`,
      method: "DELETE",
      data: selectedCampground,
      headers: {
        "x-auth-token": `${currentToken}`,
      },
    })
      .then(() => {
        setSelectedCampgroundIndex(undefined);
        setSelectedCampgroundId(undefined);
      })
      .catch(() => {
        toast.error("Error, campground not deleted...", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    handleOpenViewEditCampgroundModal();
    setSelectedCampgroundIndex(undefined);
    setSelectedCampgroundId(undefined);
    setEditWindow(false);
    window.location.reload();
  }
  // Modals Opening/Closing
  function handleOpenAddCampgroundModal() {
    modalAddRef.current.toggleModal();
  }
  function handleOpenViewEditCampgroundModal() {
    modalViewEditRef.current.toggleModal();
  }
  // Handles Clearing Calendar When Exiting Modal
  function handleCalendarClear() {
    setStartDate(null);
    setEndDate(null);
    setFocusedInput(null);
    setSelectedCampgroundIndex(null);
    setSelectedCampgroundId(null);
    handleOpenViewEditCampgroundModal();
    setEditWindow(false);
    // window.location.reload();
  }
  // Handles Edit Button
  function handleEditWindow() {
    setEditWindow(!editWindow);
  }
  // Retrieves Bookings
  function retrieveBookings() {
    let retrievedBookings = [];

    if (
      selectedCampgroundId !== null &&
      selectedCampgroundIndex !== null &&
      selectedCampground.bookings &&
      selectedCampground.bookings !== undefined &&
      selectedCampground.bookings !== null
    ) {
      for (let i = 0; i < selectedCampground.bookings.length; i++) {
        axios({
          url: `/api/campgrounds/${selectedCampground._id}/bookings/${selectedCampground.bookings[i]}`,
          method: "GET",
          data: selectedCampground,
        })
          .then((res) => {
            retrievedBookings.push(res.data);
          })
          .catch(() => {
            console.log("Internal Server Error");
          });
      }
      return retrievedBookings;
    }
    return null;
  }

  // Handles Book Button
  function handleCalendarBook() {
    if (!currentUser) {
      toast.error("Please login to book a campground!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (startDate === null || endDate === null) {
      toast.error("Please enter both start and end dates...", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const formattedStartDate = moment(startDate).format("YYYY-MM-DD");
      const formattedEndDate = moment(endDate).format("YYYY-MM-DD");
      const fullName = `${currentUser.first_name} ${currentUser.last_name}`;
      const newBooking = {
        user: fullName,
        user_id: currentUser.id,
        date_range: [formattedStartDate, formattedEndDate],
      };
      console.log(newBooking);
      const editedSelectedCampground = selectedCampground;
      editedSelectedCampground.bookings.push(newBooking);
      const currentToken = localStorage.getItem("token");
      axios({
        url: `/api/campgrounds/${editedSelectedCampground._id}/bookings`,
        method: "POST",
        data: newBooking,
        headers: {
          "x-auth-token": `${currentToken}`,
        },
      })
        .then(() => {
          toast.success("Your campground is booked!", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch(() => {
          toast.error(
            "Hmmm, something went wrong. Please try booking again...",
            {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        });
    }
    handleCalendarClear();
  }
  // Handles Deleting Booking
  function handleBookingDelete(id) {
    const newBookingsIdArray = selectedCampground.bookings.filter(
      (booking) => booking._id !== id
    );
    const newBookingsArray = selectedBookings.filter(
      (booking) => booking._id !== id
    );
    const editedSelectedCampground = selectedCampground;
    setSelectedBookings(newBookingsArray);
    editedSelectedCampground.bookings = newBookingsIdArray;
    const currentToken = localStorage.getItem("token");
    axios({
      url: `/api/campgrounds/${selectedCampground._id}/bookings/${id}`,
      method: "DELETE",
      data: newBookingsIdArray,
      headers: {
        "x-auth-token": `${currentToken}`,
      },
    })
      .then(() => {
        console.log("Campground booking deleted from the server");
        toast.success("Campground booking deleted!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(() => {
        console.log("Internal Server Error, campground booking not deleted");
        toast.error("Error, campground booking not deleted...", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  const CampgroundContextValue = {
    handleBookingDelete,
    handleCalendarBook,
    handleCalendarClear,
    handleCampgroundAdd,
    handleCampgroundSelect,
    handleCampgroundChange,
    handleCampgroundDelete,
    handleEditWindow,
    handleOpenAddCampgroundModal,
    handleOpenViewEditCampgroundModal,
    campgrounds,
    editWindow,
    modalAddRef,
    modalViewEditRef,
    selectedCampgroundIndex,
    selectedCampgroundId,
    selectedCampground,
    selectedBookings,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    focusedInput,
    setFocusedInput,
  };

  return (
    <CampgroundContext.Provider value={CampgroundContextValue}>
      {children}
    </CampgroundContext.Provider>
  );
}

// const sampleCampgrounds = [
//   {
//     id: uuidv4(),
//     name: "Mossy Goat",
//     image:
//       "https://images.unsplash.com/photo-1533575770077-052fa2c609fc?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9",
//     price: "9.00",
//     description: "Mossy Goat is good.",
//     bookings: [
//       {
//         id: uuidv4(),
//         user: "Tyler Kaihara",
//         date_range: ["2020-10-13", "2020-10-14"],
//       },
//       {
//         id: uuidv4(),
//         user: "Tori Burgess",
//         date_range: ["2020-09-25", "2020-09-30"],
//       },
//       {
//         id: uuidv4(),
//         user: "Tori Burgess",
//         date_range: ["2020-09-05", "2020-09-15"],
//       },
//       {
//         id: uuidv4(),
//         user: "Elmer Fudd",
//         date_range: ["2020-09-20", "2020-09-23"],
//       },
//     ],
//   },
//   {
//     id: uuidv4(),
//     name: "Sweetwater Gap",
//     image:
//       "https://images.unsplash.com/photo-1506535995048-638aa1b62b77?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9",
//     price: "9.00",
//     description: "Sweetwater Gap is good.",
//     bookings: [
//       {
//         id: uuidv4(),
//         user: "Tyler Kaihara",
//         date_range: ["2020-10-13", "2020-10-14"],
//       },
//       {
//         id: uuidv4(),
//         user: "Tori Burgess",
//         date_range: ["2020-09-25", "2020-09-30"],
//       },
//       {
//         id: uuidv4(),
//         user: "Tori Burgess",
//         date_range: ["2020-09-05", "2020-09-15"],
//       },
//       {
//         id: uuidv4(),
//         user: "Elmer Fudd",
//         date_range: ["2020-09-20", "2020-09-23"],
//       },
//       {
//         id: uuidv4(),
//         user: "Elmer Fuddsssssss",
//         date_range: ["2020-04-20", "2020-04-23"],
//       },
//     ],
//   },
//   {
//     id: uuidv4(),
//     name: "Bird's Nest",
//     image:
//       "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9",
//     price: "9.00",
//     description: "Bird's Nest is good.",
//     bookings: [
//       {
//         id: uuidv4(),
//         user: "Tyler Kaihara",
//         date_range: ["2020-10-13", "2020-10-14"],
//       },
//       {
//         id: uuidv4(),
//         user: "Tori Burgess",
//         date_range: ["2020-09-25", "2020-09-30"],
//       },
//       {
//         id: uuidv4(),
//         user: "Tori Burgess",
//         date_range: ["2020-09-05", "2020-09-15"],
//       },
//       {
//         id: uuidv4(),
//         user: "Elmer Fudd",
//         date_range: ["2020-09-20", "2020-09-23"],
//       },
//     ],
//   },
//   {
//     id: uuidv4(),
//     name: "Cocoa Bear",
//     image:
//       "https://images.unsplash.com/photo-1561387809-9117e4e5b52c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9",
//     price: "9.00",
//     description: "Cocoa Bear is good.",
//     bookings: [],
//   },
//   {
//     id: uuidv4(),
//     name: "Honeymoon Hollow",
//     image:
//       "https://images.unsplash.com/photo-1562610744-7c427b542ccd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9",
//     price: "9.00",
//     description: "Honeymoon Hollow.",
//     bookings: [
//       {
//         id: uuidv4(),
//         user: "Tyler Kaihara",
//         date_range: ["2020-10-13", "2020-10-14"],
//       },
//       {
//         id: uuidv4(),
//         user: "Tori Burgess",
//         date_range: ["2020-09-25", "2020-09-30"],
//       },
//       {
//         id: uuidv4(),
//         user: "Tori Burgess",
//         date_range: ["2020-09-05", "2020-09-15"],
//       },
//       {
//         id: uuidv4(),
//         user: "Elmer Fudd",
//         date_range: ["2020-09-20", "2020-09-23"],
//       },
//     ],
//   },
//   {
//     id: uuidv4(),
//     name: "Big Dipper Hideaway",
//     image:
//       "https://images.unsplash.com/photo-1519708495087-ca1b71df408c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9",
//     price: "9.00",
//     description: "Big Dipper Hideaway is good.",
//     bookings: [],
//   },
// ];
