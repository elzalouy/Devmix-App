import React, { Component } from "react";
import eventsImg from "../../../assets/event.svg";
import { admin } from "../../../httpServices/auth/auth";
import { getDate } from "../../../utils/formatDate";
class HeaderForm extends Component {
  render() {
    if (!admin()) return 0;
    const {
      event,
      errors,
      submit,
      change,
      cancel,
      changeCover,
      cover
    } = this.props;
    let { day, monthNum, year } = getDate(event.date);
    if (day < 10) day = "0" + day;
    if (monthNum < 10) monthNum = "0" + monthNum;
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
          <form>
            <input
              autoFocus
              name="name"
              id="name"
              type="text"
              className="f-72 w-75 fw-b event-input-edit text-white"
              value={event.name}
              onChange={change}
            />
            <div className="font-weight-light">
              <i className="fas fa-clock pr-2"></i>
              <input
                type="date"
                name="date"
                className="event-input-edit text-white"
                value={`${year}-${monthNum}-${day}`}
                onChange={change}
              />
            </div>
            <div className="font-weight-light">
              <i className="fas fa-map-marked-alt pr-2" />
              <input
                type="text"
                name="location"
                value={event.location}
                onChange={change}
                className="event-input-edit text-white"
              />
            </div>
            <br />
            <button
              className="btn btn-success brd-1 py-2 m-1"
              type="submit"
              onClick={submit}
            >
              Save
            </button>
            <button className="btn btn-danger brd-1 py-2" onClick={cancel}>
              Cancel
            </button>
            <input
              disabled={cover ? true : false}
              type="file"
              className="btn btn-warning custom-file"
              name="coverPhoto"
              onChange={changeCover}
            />
          </form>
          {errors && <h6 className="text-white">{errors.message}</h6>}
        </div>
      </React.Fragment>
    );
  }
}

export default HeaderForm;
