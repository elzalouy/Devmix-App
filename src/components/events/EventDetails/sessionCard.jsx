import React, { Component } from "react";
import { getTime } from "../../../utils/formatDate";
import { admin } from "../../../httpServices/auth/auth";
class SessionCard extends Component {
  render() {
    const { item, deleteSession, edit } = this.props;
    const { hour, minutes } = getTime(item.time);
    return (
      <React.Fragment>
        <div className="row">
          <h4 className="fw-b">
            <mark className="px-2 m-2">
              {item.session_number <= 9
                ? "0" + item.session_number
                : item.session_number}
            </mark>
            {item.session_name}
          </h4>
          {admin() && (
            <React.Fragment>
              <i
                className="fa fa-ellipsis-h mx-auto ellipsis f-18 text-black"
                aria-hidden="true"
                data-toggle="dropdown"
              ></i>
              <div className="dropdown-menu">
                <button className="dropdown-item" id={item._id} onClick={edit}>
                  Edit
                </button>
                <button
                  id={item._id}
                  className="dropdown-item"
                  onClick={deleteSession}
                >
                  Delete
                </button>
              </div>
            </React.Fragment>
          )}
        </div>
        <p className="text-gray p-0 m-0 pl-5">
          <i className="fas fa-clock"></i> {hour}: {minutes} &nbsp; &nbsp;
          &nbsp;
          <i className="fa fa-calendar" aria-hidden="true"></i>
          {"  "}
          {item.date}
        </p>
        <br />
        <h6>{item.content_desc}</h6>
      </React.Fragment>
    );
  }
}

export default SessionCard;
