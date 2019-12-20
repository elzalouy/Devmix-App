import React from "react";
import HeadTitle from "../../common/headTitle/headTitle";
import SpeakerCard from "../EventDetails/speakerCard";
import TimelineCard from "./timelineCard";
import EventComponent from "./eventInterface";
import HeaderForm from "./HeaderForm";
import HeaderCard from "./HeaderCard";
import SessionForm from "./sessionForm";
import SessionCard from "./sessionCard";
import { admin } from "../../../httpServices/auth/auth";
const _ = require("lodash");

class EventDetails extends EventComponent {
  render() {
    const { event, days, status, errors, session_id, speakers } = this.state;
    return (
      <React.Fragment>
        <div className="page-section bg-dark text-white text-center">
          <div className="container pt-5 text-center">
            <div className="row pt-5 text-center">
              {admin() && event && status === "editHeader" ? (
                <HeaderForm
                  event={event}
                  submit={this.handleSubmit}
                  errors={errors}
                  change={this.handleChange}
                  cancel={this.cancelSubmit}
                  changeCover={this.handleUpdateCover}
                  cover={this.state.cover_photo}
                />
              ) : (
                <HeaderCard
                  event={event}
                  edit={this.handleEdit}
                  deleteEvent={this.handleDeleteEvent}
                  attend={this.attendEvent}
                  notAttend={this.notAttendEvent}
                  attendee={this.state.attendee}
                  coverPhoto={this.state.event_Cover}
                />
              )}
            </div>
          </div>
        </div>
        <div className="page-section">
          <div className="container">
            <div className="row justify-content-center m-0 text-center">
              <div className="row mx-auto">
                <div className="container text-center">
                  <p className="f-18 text-dark fw-b">Sessions @ activities</p>
                  <HeadTitle
                    label="heighten your capabilities?"
                    color="#2c3e50"
                    size="32px"
                  />
                  <div className="row justify-content-center align-items-top mt-5">
                    <React.Fragment>
                      {event &&
                        event.sessions &&
                        event.sessions.map(item => {
                          return (
                            <React.Fragment key={item._id}>
                              <div
                                className="col-sm-6 text-left mb-5"
                                id={item._id}
                              >
                                {admin() &&
                                status === "editSession" &&
                                session_id === item._id ? (
                                  <SessionForm
                                    status={this.state.status}
                                    item={item}
                                    errors={errors}
                                    speakers={speakers}
                                    change={this.handleChangeSession}
                                    submit={this.handleSubmit}
                                    cancel={this.cancelSubmit}
                                    speakersSearch={this.handleSearch}
                                    deleteSpeaker={this.handleDeleteSpeaker}
                                    chooseSpeaker={this.handleChooseSpeaker}
                                  />
                                ) : (
                                  <SessionCard
                                    item={item}
                                    edit={this.handleEditSession}
                                    deleteSession={this.handleDeleteSession}
                                  />
                                )}
                              </div>
                            </React.Fragment>
                          );
                        })}
                    </React.Fragment>
                  </div>
                  {admin() && (
                    <div className="text-center mt-5  ">
                      <div className=" text-dark f-48 ">
                        <i
                          className="fa fa-plus-circle cursor-p add_session"
                          aria-hidden="true"
                          onClick={this.handleAddSession}
                        ></i>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="page-section bg-dark">
          <div className="container">
            <HeadTitle label="Who are speakers?" color="white" size="32px" />
            <div className="row justify-content-center align-items-center">
              <React.Fragment>
                {event &&
                  event.sessions &&
                  event.sessions.map(item => {
                    return (
                      <SpeakerCard
                        item={item}
                        key={item._id + item.instructor_id}
                      />
                    );
                  })}
              </React.Fragment>
            </div>
          </div>
        </div>
        <div className="page-section">
          <div className="container">
            <HeadTitle label="timeline" color="#2c3e50" size="32px" />
            <div className="row justify-content-center">
              <div className="page-section">
                <div className="container">
                  <div className="row justify-content-center">
                    <React.Fragment>
                      {event &&
                        event.sessions &&
                        days &&
                        days.map(item => {
                          const day_sessions = _.filter(
                            event.sessions,
                            s => s.date.toString().toLowerCase() === item
                          );
                          return (
                            <React.Fragment key={item}>
                              <div className="brd-3 m-2 p-3 bg-bottomDark text-center text-white">
                                <h4>{item}</h4>
                                <hr className="bg-white" />
                                {day_sessions.map(item => (
                                  <TimelineCard session={item} key={item._id} />
                                ))}
                              </div>
                            </React.Fragment>
                          );
                        })}
                    </React.Fragment>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default EventDetails;
