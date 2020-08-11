import React from "react";
import Jumbotron from "../components/Jumbotron";
import CampgroundGallery from "../components/CampgroundGallery";
import Information from "../components/Information";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <div>
        <Jumbotron />
        <CampgroundGallery />
        <Information />
        <Contact />
      </div>
    </>
  );
}
