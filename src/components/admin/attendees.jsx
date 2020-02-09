import React, { Component } from "react";
import HeadTitle from "../common/headTitle/headTitle";
import Attendee from "./attendee";
import { getAttendeesList } from "../../httpServices/event/attendees";
import { getToken } from "../../httpServices/localStorage";
const _ = require("lodash");

class Attendees extends Component {
  state = {
    tableId: null,
    display: false,
    events: []
  };
  async componentDidMount() {
    let attendees = await getAttendeesList(getToken());
    if (attendees.error) return alert(attendees.error);
    else attendees = attendees.data;
    let events = _.uniqBy(attendees, "name");
    events = events.map(item => item.name);
    events = events.map(item => {
      let list = _.filter(attendees, s => s.name === item);
      return { name: item, attendees: list };
    });
    const state = this.state;
    state.events = events;
    this.setState({ state });
  }

  handleChoose = async ({ currentTarget: e }) => {
    const state = this.state;
    if (state.tableId === e.id)
      state.display = state.display === false ? true : false;
    state.tableId = e.id;
    this.setState({ state });
  };

  render() {
    const { events, display, tableId } = this.state;
    return (
      <React.Fragment>
        <div className="page-section bg-gray">
          <div className="container">
            <HeadTitle label="Attendees List" color="#2c3e50" size="64px" />
            {events && events.length > 0 ? (
              events.map(item => {
                return (
                  <Attendee
                    tableId={tableId}
                    display={display}
                    event={item}
                    handleChoose={this.handleChoose}
                    key={events.indexOf(item)}
                  />
                );
              })
            ) : (
              <h1 className="text-dark text-center">
                There are no attendees right now.
              </h1>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Attendees;
