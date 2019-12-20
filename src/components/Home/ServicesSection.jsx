import React from "react";
import HeadTitle from "../common/headTitle/headTitle";
import cabinImg from "../../assets/cabin.png";
import ServicesModalSection from "./servicesModalSection";

const ServicesSection = () => {
  return (
    <React.Fragment>
      <div className="page-section bg-white">
        <div className="container">
          <HeadTitle label="Services" color="#2c3e50" size="48px" />
          <div className="row">
            <div
              className="col-md-6 col-lg-4"
              data-toggle="modal"
              data-target="#serviceModel1"
            >
              <div
                className="services-item"
                data-toggle="modal"
                data-target="#service1"
              >
                <div className="services-item-caption d-flex align-items-center justify-content-center w-100 h-100">
                  <div className="text-center text-white f-48">
                    <i className="fa fa-book-open fa-3x" aria-hidden="true"></i>
                  </div>
                </div>
                <img src={cabinImg} alt="" className="w-100 h-100" />
              </div>
            </div>
            <div
              className="col-md-6 col-lg-4"
              data-toggle="modal"
              data-target="#serviceModel1"
            >
              <div
                className="services-item"
                data-toggle="modal"
                data-target="#service1"
              >
                <div className="services-item-caption d-flex align-items-center justify-content-center w-100 h-100">
                  <div className="text-center text-white f-48">
                    <i className="fa fa-book-open fa-3x" aria-hidden="true"></i>
                  </div>
                </div>
                <img src={cabinImg} alt="" className="w-100 h-100" />
              </div>
            </div>
            <div
              className="col-md-6 col-lg-4"
              data-toggle="modal"
              data-target="#serviceModel1"
            >
              <div
                className="services-item "
                data-toggle="modal"
                data-target="#service1"
              >
                <div className="services-item-caption d-flex align-items-center justify-content-center w-100 h-100">
                  <div className="text-center text-white f-48">
                    <i className="fa fa-book-open fa-3x" aria-hidden="true"></i>
                  </div>
                </div>
                <img src={cabinImg} alt="" className="w-100 h-100" />
              </div>
            </div>
            <div
              className="col-md-6 col-lg-4"
              data-toggle="modal"
              data-target="#serviceModel1"
            >
              <div
                className="services-item"
                data-toggle="modal"
                data-target="#service1"
              >
                <div className="services-item-caption d-flex align-items-center justify-content-center w-100 h-100">
                  <div className="text-center text-white f-48">
                    <i className="fa fa-book-open fa-3x" aria-hidden="true"></i>
                  </div>
                </div>
                <img src={cabinImg} alt="" className="w-100 h-100" />
              </div>
            </div>
            <div
              className="col-md-6 col-lg-4"
              data-toggle="modal"
              data-target="#serviceModel1"
            >
              <div
                className="services-item"
                data-toggle="modal"
                data-target="#service1"
              >
                <div className="services-item-caption d-flex align-items-center justify-content-center w-100 h-100">
                  <div className="text-center text-white f-48">
                    <i className="fa fa-book-open fa-3x" aria-hidden="true"></i>
                  </div>
                </div>
                <img src={cabinImg} alt="" className="w-100 h-100" />
              </div>
            </div>
            <div
              className="col-md-6 col-lg-4"
              data-toggle="modal"
              data-target="#serviceModel1"
            >
              <div
                className="services-item"
                data-toggle="modal"
                data-target="#service1"
              >
                <div className="services-item-caption d-flex align-items-center justify-content-center w-100 h-100">
                  <div className="text-center text-white f-48">
                    <i className="fa fa-book-open fa-3x" aria-hidden="true"></i>
                  </div>
                </div>
                <img src={cabinImg} alt="" className="w-100 h-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ServicesModalSection id="serviceModel1" />
    </React.Fragment>
  );
};

export default ServicesSection;
