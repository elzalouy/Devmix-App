import React from "react";
import notfound from "../../../assets/notfound.svg";
const NotFound = () => {
  return (
    <React.Fragment>
      <div className="page-section">
        <img
          src={notfound}
          alt=""
          style={{
            height: "20%",
            width: "40%",
            margin: "5% 0 0 30%"
          }}
        />
        <h2 className="text-dark text-center mb-5 fw-n f-48">Page not found</h2>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
