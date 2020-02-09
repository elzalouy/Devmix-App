import React from "react";
import HeadTitle from "../../common/headTitle/headTitle";
import SpeakerCard from "../EventDetails/speakerCard";
import TimelineCard from "./timelineCard";
import EventComponent from "./eventInterface";
import HeaderForm from "./HeaderForm";
import HeaderCard from "./HeaderCard";
import SessionForm from "./sessionForm";
import SessionCard from "./sessionCard";
import FeedbacksList from "./feedbacks";
import { admin } from "../../../httpServices/auth/auth";
const _ = require("lodash");

class EventDetails extends EventComponent {
  render() {
    const {
      event,
      days,
      status,
      errors,
      session_id,
      speakers,
      feedbackError
    } = this.state;
    if (!event) window.location = "/";
    return (
      <React.Fragment>
        <div className="fixed-left bottom list-group">
          {event && event.twitter_link && (
            <button
              className="btn bottomDark f-24 brd-0 cursor-p mb-1"
              data-toggle="modal"
              data-target="#feedback"
            >
              <i className="fa fa-thumbs-up" aria-hidden="true"></i>
            </button>
          )}
          {event && event.twitter_link && (
            <a
              target="blank"
              href={event && event.facebook_link ? event.facebook_link : ""}
              className="btn bottomDark f-24 brd-0 cursor-p mb-1 "
            >
              <i className="fab fa-facebook-f"></i>
            </a>
          )}
          {event && event.twitter_link && (
            <a
              href={event.twitter_link}
              target="blank"
              className="btn bottomDark f-24 brd-0 cursor-p mb-1"
            >
              <i className="fab fa-twitter" aria-hidden="true"></i>
            </a>
          )}
        </div>
        <div className="page-section bg-dark text-white text-center">
          <div className="container  pt-5 text-center">
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
              <FeedbacksList
                feedbacks={event && event.feedbacks ? event.feedbacks : []}
              />
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
                              {admin() &&
                              (status === "editSession" ||
                                status === "addSession") &&
                              session_id === item._id ? (
                                <div
                                  className="w-100 text-left mb-5"
                                  id={item._id}
                                >
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
                                </div>
                              ) : (
                                <div
                                  className="col-md-6 text-left mb-5"
                                  id={item._id}
                                >
                                  <SessionCard
                                    item={item}
                                    edit={this.handleEditSession}
                                    deleteSession={this.handleDeleteSession}
                                  />
                                </div>
                              )}
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
        <div
          className="modal fade"
          id="feedback"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="feedback"
          aria-hidden="true"
        >
          <div className="modal-dialog mt-5 " role="document">
            <div className="modal-content bg-dark text-white brd-3 border-0">
              <div className="modal-header border-0">
                <h5 className="modal-title" id="exampleModalLabel">
                  <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                </h5>
              </div>
              <div className="modal-body border-0">
                <textarea
                  value={this.state.feedback}
                  onChange={this.handleChangeFeedback}
                  name="feedback"
                  rows="3"
                  cols="4"
                  className="form-control my-2 brd-2 f-18"
                  id="feedback"
                  placeholder="your feedback"
                  aria-invalid="false"
                />
                {feedbackError && (
                  <h5 className="text-white">{feedbackError.message}</h5>
                )}
              </div>
              <div className="modal-footer border-0">
                <button
                  className="btn bottomDark"
                  onClick={this.handleGiveFeedback}
                  data-dismiss={feedbackError.message ? "modal" : ""}
                >
                  <i className="fa fa-paper-plane" aria-hidden="true"></i>
                </button>
                <button
                  type="button"
                  className="close text-white"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default EventDetails;
