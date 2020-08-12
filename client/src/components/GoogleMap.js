import React from "react";

export default function GoogleMap() {
  return (
    <>
      <div id="info-flex">
        <div id="google-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12462.275526866131!2d-121.05866224892146!3d47.436282590670615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDI2JzA2LjYiTiAxMjHCsDAzJzIzLjkiVw!5e1!3m2!1sen!2sus!4v1591719086730!5m2!1sen!2sus"
            width="600"
            height="450"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen={false}
            aria-hidden="false"
            tabIndex="0"
            title="Google map of Vertical Ranch"
          ></iframe>
        </div>
      </div>
    </>
  );
}
