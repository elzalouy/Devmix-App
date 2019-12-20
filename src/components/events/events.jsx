import React from "react";
import EventList from "./eventList";
import HeadTitle from "../common/headTitle/headTitle";
import eventsImg from "../../assets/event.svg";
const Events = () => {
  return (
    <React.Fragment>
      <div className="page-section bg-dark text-white text-center">
        <div className="container-d-flex align-items-center flex-column">
          <img
            src={eventsImg}
            alt=""
            className="mb-5"
            style={{ height: "255px", width: "240px" }}
          />
          <HeadTitle label="Events" color="white" size="64px" />
          <p className="f-24 font-weight-light mb-0">
            Time to acquire <mark>knowledge</mark>
          </p>
        </div>
      </div>
      <EventList />
    </React.Fragment>
  );
};

export default Events;
