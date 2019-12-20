import React from "react";
import HeadTitle from "../common/headTitle/headTitle";
import cabinImg from "../../assets/cabin.png";

const ServicesModalSection = ({ id }) => {
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      role="dialog"
      aria-labelledby={id}
      style={{ display: "none" }}
      aria-hidden={true}
    >
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content">
          <button
            className="close"
            type="button"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">
              <i className="fa fa-times" aria-hidden="true"></i>
            </span>
          </button>
          <div className="modal-body text-center mt-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <HeadTitle label="workshops" color="#2c3e50" size="48px" />
                  <img
                    src={cabinImg}
                    className="img-fluid rounded mb-5"
                    alt=""
                  />
                  <p className="mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Mollitia neque assumenda ipsam nihil, molestias magnam,
                    recusandae quos quis inventore quisquam velit asperiores,
                    vitae? Reprehenderit soluta, eos quod consequuntur itaque.
                    Nam.
                  </p>
                  <button className="btn primary btn-xl">See Workshops</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesModalSection;
