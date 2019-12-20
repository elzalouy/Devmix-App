import React, { Component } from "react";
import { getDate } from "../../../utils/formatDate";
import eventsImg from "../../../assets/event.svg";
import { admin } from "../../../httpServices/auth/auth";
import { getToken } from "../../../httpServices/localStorage";
import { Link } from "react-router-dom";
class HeaderCard extends Component {
  state = { coverPhoto: {} };

  render() {
    const {
      event,
      edit,
      deleteEvent,
      attend,
      notAttend,
      attendee
    } = this.props;
    if (!event) return null;
    let { date, year, month, day } = getDate(event.date);
    return (
      <React.Fragment>
        <div className="col">
          <img
            src={eventsImg}
            alt=""
            className="mb-5"
            style={{ height: "255px", width: "240px" }}
          />
        </div>
        <div className="col text-left">
          <h1 className="f-72 fw-b text-white text-uppercase">{event.name}</h1>
          <p className="font-weight-light">
            <i className="fas fa-clock pr-2"></i>
            {day + "/" + month + "/" + year + "  "}
          </p>
          <p>
            <i className="fas fa-map-marked-alt pr-2" />
            {event.location}
          </p>
          {date > Date.now() && !getToken() && (
            <React.Fragment>
              <Link
                className="btn bottomDark p-2 m-2"
                id={event._id}
                to="/login"
              >
                Attend Now
              </Link>
            </React.Fragment>
          )}
          {date > Date.now() && getToken() && (
            <React.Fragment>
              {attendee ? (
                <button
                  className="btn bottomDark p-2 m-2 text-dark"
                  id={event._id}
                  onClick={notAttend}
                >
                  <i
                    className="fas fa-calendar-check px-2"
                    aria-hidden="true"
                  ></i>
                  Attending
                </button>
              ) : (
                <button
                  className="btn bottomDark p-2 m-2"
                  id={event._id}
                  onClick={attend}
                >
                  Attend Now
                </button>
              )}
            </React.Fragment>
          )}
          {admin() && (
            <React.Fragment>
              <button className="btn btn-primary brd-1 p-2" onClick={edit}>
                Edit
              </button>
              <button
                className="btn btn-danger brd-1 p-2 m-2"
                onClick={deleteEvent}
              >
                Delete
              </button>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default HeaderCard;
