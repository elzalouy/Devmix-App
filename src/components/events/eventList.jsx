import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getALlEvents } from "../../httpServices/event/event";
import { admin } from "../../httpServices/auth/auth";
import EventItem from "./eventItem";
import "./events.css";
import handle from "../../middleware/errorHandle";

class EventsList extends Component {
  state = { filter: "all", events: [], filtered: [] };
  async componentDidMount() {
    try {
      const { data: events } = await getALlEvents();
      if (!events) return null;
      const state = this.state;
      state.events = events;
      state.filtered = events;
      this.setState({ state });
    } catch (ex) {
      return 0;
    }
  }

  filtering = handle(label => {
    const state = this.state;
    state.filter = label;
    if (label === "upcoming") {
      state.filtered = this.state.events.filter(
        item => new Date(item.date) > Date.now()
      );
    } else if (label === "finished") {
      state.filtered = this.state.events.filter(
        item => new Date(item.date) <= Date.now()
      );
    } else {
      state.filtered = this.state.events;
    }
    this.setState({ state });
  });

  render() {
    const { filtered: events } = this.state;
    return (
      <React.Fragment>
        <div className="page-section m-0 bg-white">
          <div className="row justify-content-center m-0 text-center">
            <p
              className={
                this.state.filter === "all"
                  ? "p-2 text-dark checked-label label"
                  : "p-2 text-gray label"
              }
              onClick={() => this.filtering("all")}
            >
              All
            </p>
            <p
              className={
                this.state.filter === "upcoming"
                  ? "p-2 text-dark checked-label label"
                  : "p-2 text-gray label"
              }
              onClick={() => this.filtering("upcoming")}
            >
              Upcoming
            </p>
            <p
              className={
                this.state.filter === "finished"
                  ? "p-2 text-dark checked-label label"
                  : "p-2 text-gray label"
              }
              onClick={() => this.filtering("finished")}
            >
              Finshed
            </p>
          </div>
          <div className="container">
            <div className="row p-0 text-center align-items-center justify-content-center">
              {events.length > 0 &&
                events.map(item => <EventItem key={item._id} event={item} />)}
              {events.length === 0 && (
                <mark className="mt-5 p-2 f-24">There are no events yet.</mark>
              )}
            </div>
            {admin() && (
              <div className="text-center mt-5">
                <Link to="/newEvent" className="text-dark f-48">
                  <i className="fa fa-plus-circle" aria-hidden="true"></i>
                </Link>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default EventsList;
