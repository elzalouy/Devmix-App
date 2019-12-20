import React from "react";
import HeadTitle from "../common/headTitle/headTitle";
import { Link } from "react-router-dom";
const AboutSection = () => {
  return (
    <div className="page-section bg-dark text-white mb-0">
      <div className="container">
        <HeadTitle label="about" color="white" size="48px" />
        <div className="row justify-content-center">
          <div className="col-lg-6 ml-auto">
            <p className="f-18 fw-n">
              Devmix team aims to build a strong developers community from all
              over the world. By helping people to learn and develop their
              skills. we have many several services like events, workshops,
              online workshops, building and discussing projects, etc...
            </p>
          </div>
          <div className="col-lg-6 ml-auto">
            <p className="f-18 fw-n">
              For anyone like to take part in organizing our activities, Just
              Click on "Join us" now and sign up to contact with you. You will
              have a better opportunity if you participated in any other teams
              before and also have experience in any one of these positions (HR,
              PR, Logistics, Social media marketing, content writer, technical
              instructor)
            </p>
          </div>
          <Link
            to="/join"
            className="btn btn-xl btn-outline-light f-32 brd-2 px-auto"
          >
            JOIN US
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
