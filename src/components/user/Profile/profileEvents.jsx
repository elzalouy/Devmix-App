import React, { Component } from "react";
import HeadTitle from "../../common/headTitle/headTitle";
import { getToken } from "../../../httpServices/localStorage";
import { getUserAttendees } from "../../../httpServices/event/attendees";
import { getDate } from "../../../utils/formatDate";
import { notAttendEvent } from "../../../httpServices/event/attendees";
import EventItem from "./profileEventItem";
const _ = require("lodash");
class ProfileEvents extends Component {
  state = { userEvents: [], errors: null };
  async componentDidMount() {
    const state = this.state;
    const result = await getUserAttendees(this.props.id);
    if (result.error) state.errors = result.error;
    else state.userEvents = result.data;
    this.setState({ state });
  }

  handleNotAttendEvent = async ({ currentTarget: e }) => {
    const state = this.state;
    const result = await notAttendEvent(e.id, getToken());
    if (result.error) {
      state.errors = result.error;
    } else {
      _.remove(state.userEvents.events, s => s._id === e.id);
    }
    this.setState({ state });
  };

  render() {
    const { userEvents } = this.state;
    if (userEvents && userEvents.events && userEvents.events.length === 0)
      return null;
    return (
      <div className="page-section">
        <div className="container">
          <div className="row p-0 m-0 justify-content-center align-items-center">
            <HeadTitle label="your events" color="#2c3e50" size="54px" />
            {userEvents &&
              userEvents.events &&
              userEvents.events.map(item => {
                const { day, month, year, date } = getDate(item.date);
                return (
                  <EventItem
                    key={item._id}
                    item={item}
                    year={year}
                    month={month}
                    date={date}
                    day={day}
                    handleNotAttendEvent={this.handleNotAttendEvent}
                  />
                );
              })}
            {this.state.errors && (
              <p className="text-gray">{this.state.errors.message}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileEvents;
