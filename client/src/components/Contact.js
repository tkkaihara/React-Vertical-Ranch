import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="home-c-background">
      <div className="container">
        <section id="home-a" className="text-center py-2">
          <h2 className="section-title">Contact Us</h2>
          <div className="bottom-line"></div>
          <div className="contact-grid mt-4">
            <div className="contact-grid-item-img">
              <img
                src="img/contact-img.jpeg"
                alt="Portrait"
                className="contact-img"
              />
            </div>
            <div className="contact-grid-item-text">
              <p className="lead contact-text">
                Vertical Ranch is owned and run by Gentry and Elaine Burgess. As
                Kirkland, WA locals, they know that time away from the busy city
                is sometimes a needed break.
              </p>
              <br />
              <p className="lead contact-text">
                For any additional information please contact us by phone or
                email:
              </p>
              <br />
              <div className="contact-info-outer-grid">
                <div className="contact-info-inner-grid">
                  <div className="contact-info-icon">
                    <i className="fas fa-mobile-alt mr-3"></i>
                  </div>
                  <div className="contact-info-item">
                    <span>425-822-4587</span>
                  </div>
                </div>
                <div className="contact-info-inner-grid">
                  <div className="contact-info-icon">
                    <i className="far fa-envelope mr-3"></i>
                  </div>
                  <div className="contact-info-item">
                    <span>gr.eb@frontier.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
