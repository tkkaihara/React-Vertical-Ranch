import React from "react";
import { Link } from "react-scroll";

export default function Jumbotron() {
  return (
    <section id="landing">
      <div className="header-box">
        <div className="header-text ml-3">
          <h1>Vertical Ranch</h1>
        </div>
        <div className="header-secondary">
          <div className="header-text">
            <p>
              There{" "}
              <span
                className="txt-type"
                data-wait="2500"
                data-words='["are no", "might be", "are"]'
              ></span>{" "}
              bears here.
            </p>
          </div>
          <div>
            <Link
              to="campgrounds"
              smooth={true}
              duration={800}
              className="call-to-action"
            >
              Find Your Adventure
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
