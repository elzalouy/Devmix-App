import React, { Component } from "react";
import HeadTitle from "../common/headTitle/headTitle";
import ServicesSection from "./ServicesSection";
import AboutSection from "./aboutSection";
import ContactSection from "./contactSection";
import avatar from "../../assets/avataaars.svg";
import "../Home/Home.css";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="page-section bg-dark text-white text-center">
          <div className="container d-flex align-items-center flex-column">
            <img
              className="mb-5"
              src={avatar}
              alt="avatar"
              style={{ height: "255px", width: "240px" }}
            />
            <HeadTitle label="devmix team" color="white" size="64px" />
            <p className="f-24 font-weight-light mb-0">
              Share knowledge & Share experience
            </p>
          </div>
        </div>
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </React.Fragment>
    );
  }
}
export default Home;
