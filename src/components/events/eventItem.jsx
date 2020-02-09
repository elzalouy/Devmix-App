import React from "react";
import { Link } from "react-router-dom";
import { getDate } from "../../utils/formatDate";
import eventImg from "../../assets/emcee.png";
const EventItem = ({ event }) => {
  if (!event) window.location = "/";
  const { date, year, month, day } = getDate(event.date);
  return (
    <React.Fragment>
      <div className="col-lg-5">
        <div className="event-item bg-gray mb-4 brd-5">
          <div className="row p-0 m-0">
            <div className="col-sm-12 event_cover">
              <img
                src={
                  event && event.cover_photo ? event.cover_photo.url : eventImg
                }
                alt=""
                className="w-100 h-100"
              />
              <h1 className="text-white title text-uppercase">{event.name}</h1>
            </div>
            <Link
              className="item-data details text-black"
              to={`event/${event._id}`}
            >
              <i className="fas fa-calendar-alt f-32"></i>
              <p className="f-18">Details</p>
            </Link>
            <div className="item-data pt-4 mx-auto">
              <p className="f-12 mb-1 m-0">
                {date > Date.now() ? "going" : "Went"}
              </p>
              <i className="fas fa-walking f-32"></i>
              <p className="fw-b">{event.users}</p>
            </div>
            <div className="item-data pt-4 mx-auto">
              <p className="f-12 mb-1 m-0">Feedbacks</p>
              <i className="fa fa-users f-32" aria-hidden="true"></i>
              <p className="fw-b">
                {event.feedbacks && event.feedbacks.length}
              </p>
            </div>
            <div className="item-data pt-4 mx-auto">
              <p className="f-12 mb-1 m-0">Sessions</p>
              <i className="fas fa-chalkboard-teacher f-32"></i>
              <p className="fw-b">{event.sessions && event.sessions.length}</p>
            </div>
            <div className="item-data  date bg-black text-white">
              <p className="m-0 p-0 text-uppercase">{month}</p>
              <p className="f-32 m-0">{day}</p>
              <p className="fw-b f-12">{year}</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EventItem;
