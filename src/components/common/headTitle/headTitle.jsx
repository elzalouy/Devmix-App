import React from "react";
import "../headTitle/headTitle.css";
const HeadTitle = ({ label, color, size }) => {
  return (
    <React.Fragment>
      <h2
        className="text-uppercase text-center mb-0 fw-b"
        style={{ fontSize: size, color: color }}
      >
        {label}
      </h2>
      <div className="divider-custom">
        <i className="divider-custom-line" style={{ backgroundColor: color }} />
        <i
          className="fa fa-star divider-custom-icon"
          style={{ color: color }}
          aria-hidden="true"
        ></i>
        <i className="divider-custom-line" style={{ backgroundColor: color }} />
      </div>
    </React.Fragment>
  );
};

export default HeadTitle;
