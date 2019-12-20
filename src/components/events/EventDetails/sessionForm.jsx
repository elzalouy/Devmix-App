import React, { Component } from "react";
import { getTime } from "../../../utils/formatDate";
import { getUserById } from "../../../httpServices/user/user";
import { admin } from "../../../httpServices/auth/auth";
class SessionForm extends Component {
  state = { user: {}, errors: null };
  async componentDidMount() {
    const state = this.state;
    if (this.props.status !== "editSession") return 0;
    const result = await getUserById(this.props.item.instructor_id);
    if (result.error) state.errors = result.error;
    else state.user = result.data;
    this.setState({ state });
  }
  render() {
    const {
      errors,
      speakers,
      item,
      change,
      submit,
      cancel,
      speakersSearch,
      deleteSpeaker,
      chooseSpeaker
    } = this.props;
    const user = this.state.user;
    const { hour, minutes } = getTime(item.time);
    if (!admin()) return 0;
    return (
      <React.Fragment>
        <form onSubmit={submit}>
          <div className="row">
            <h4 className="fw-b">
              <mark className="px-2 m-2">
                <input
                  type="text"
                  value={item.session_number}
                  name="session_number"
                  id="session_number"
                  onChange={change}
                  style={{ width: "20px" }}
                  className="event-session-input bg-darkBlue text-white"
                />
              </mark>
              <input
                className="event-session-input p-2"
                name="session_name"
                type="text"
                value={item.session_name}
                onChange={change}
              />
            </h4>
          </div>
          <div className="text-gray p-0 m-0 pl-5">
            <i className="fas fa-clock"></i>
            <input
              type="time"
              name="time"
              className="bg-white event-input-edit text-gray"
              value={`${hour}:${minutes}`}
              onChange={change}
            />{" "}
            &nbsp; &nbsp; &nbsp;
            <i className="fa fa-calendar" aria-hidden="true"></i>
            <input
              className="bg-white event-input-edit text-gray"
              type="text"
              name="date"
              value={item.date}
              onChange={change}
            />
          </div>
          <br />
          <h6>
            <textarea
              type="text"
              name="content_desc"
              id="content_desc"
              value={item.content_desc}
              onChange={change}
              className="w-100  h-100 bg-white event-input-edit"
              rows="7"
            />
          </h6>
          {!item.instructor_id && (
            <div className="form-group">
              <h6>Speaker</h6>
              <input
                type="text"
                name="searchValue"
                className="form-control"
                placeholder="Search"
                onChange={speakersSearch}
              />
              {speakers.length > 0 && (
                <div className="speakersSearch">
                  <ul className="list-group">
                    {speakers.map(item => (
                      <li
                        onClick={chooseSpeaker}
                        className="list-group-item hover-gray"
                        key={item._id}
                        id={item._id}
                      >
                        <img
                          src={
                            user && user.profile_photo ? item.profile_photo : ""
                          }
                          style={{ width: "40px", height: "40px" }}
                          alt=""
                          className="brd-100"
                        />{" "}
                        {item && item.name ? item.name : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          {item.instructor_id && (
            <React.Fragment>
              <div className="row align-items-center align-items-center my-3">
                <h5 className="px-3">Speaker</h5>
                <div className="align-items-center row  border br-dark brd-5 w-50">
                  <img
                    src={user && user.profile_photo ? user.profile_photo : ""}
                    alt={user && user.name ? user.name : ""}
                    style={{ height: "46px", width: "46px" }}
                    className="brd-100"
                  />
                  <h5>{user && user.name ? user.name : ""}</h5>
                  <button
                    type="button"
                    className="ml-auto bg-transparent border-0 f-32 p-0 pb-2"
                    data-dismiss="toast"
                    aria-label="Close"
                    onClick={deleteSpeaker}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
            </React.Fragment>
          )}
          <button className="btn btn-success p-2 m-1" type="submit">
            Save
          </button>
          <button className="btn btn-danger p-2 m-1" onClick={cancel}>
            Cancel
          </button>
        </form>
        {errors && <p className="text-dark">{errors}</p>}
      </React.Fragment>
    );
  }
}

export default SessionForm;
