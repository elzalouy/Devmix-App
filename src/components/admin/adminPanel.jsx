import React, { Component } from "react";
import admin from "../../assets/administrator.svg";
import HeadTitle from "../common/headTitle/headTitle";
import Contacts from "./contacts";
import JoinForms from "../../components/admin/joinForms";
import Attendees from "./attendees";
import AdministratorsList from "./administratorsList";
class AdminPanel extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="page-section bg-dark">
          <div className="container text-white d-flex align-items-center mt-5 flex-column">
            <img
              src={admin}
              alt="avatar"
              style={{ height: "255px", width: "240px" }}
            />
            <HeadTitle label="Admin Panel" color="white" size="64px" />
            <p className="f-24 font-weight-light mb-0">
              Help your team & improve your skills
            </p>
          </div>
        </div>
        <Contacts />
        <JoinForms />
        <Attendees />
        <AdministratorsList />
      </React.Fragment>
    );
  }
}

export default AdminPanel;
