import React, { Component } from "react";
import session from "../../../assets/session1.png";
import { getUserByToken } from "../../../httpServices/user/user";
import { owner } from "../../../httpServices/auth/auth";
class EventItem extends Component {
  state = {};
  render() {
    const { item, day, year, month, date, handleNotAttendEvent } = this.props;
    let user = getUserByToken();
    return (
      <div key={item._id} className="col-md-6">
        <div className="row shadow m-1 brd-3 bg-white overflow_hidden">
          <div className="col-md-6 p-0 m-0 w-100">
            <img
              src={item.cover_photo ? item.cover_photo.url : session}
              alt=""
              className="w-100 h-100"
            />
          </div>
          <div className="col p-3 m-0">
            <h2 className="text-uppercase py-1">
              <i className="fa fa-bell" aria-hidden="true"></i> {item.name}
            </h2>
            <h6 className="text-gray py-1 pl-3">
              <i className="fa fa-map-marked" aria-hidden="true"></i>{" "}
              {item.location}
            </h6>
            <h6 className="text-gray py-1 pl-3">
              <i className="fas fa-clock"></i>
              {`   ${day} / ${month} / ${year}`}
            </h6>
            <h6 className="text-gray py-1 pl-3">
              {date < Date.now() && (
                <React.Fragment>
                  <i className="fas fa-calendar-check"></i> Attended
                </React.Fragment>
              )}
            </h6>
            <div className="text-right">
              {date > Date.now() && !item.confirmed && user && owner(user._id) && (
                <button
                  className="btn bg-dark text-white"
                  onClick={handleNotAttendEvent}
                  id={item._id}
                >
                  <i className="fas fa-calendar-check p-1"></i> Not Attend
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventItem;
