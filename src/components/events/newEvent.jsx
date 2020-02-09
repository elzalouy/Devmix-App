import React, { Component } from "react";
import { phaseOne, phaseTwo, phaseThree } from "./newEventPhases";
import ImageUploader from "react-images-upload";
import { getUserByName, getUserById } from "../../httpServices/user/user";
import {
  validateSession,
  validateEvent
} from "../../httpServices/event/EventJoiSchemas";
import { saveEvent, saveEventImage } from "../../httpServices/event/event";
import { admin } from "../../httpServices/auth/auth";
import { getToken } from "../../httpServices/localStorage";
import userImage from "../../assets/user.png";
const handle = require("../../middleware/errorHandle");
class AddEvent extends Component {
  image = React.createRef();
  state = {
    form: {
      name: "",
      date: "",
      location: "",
      cover_photo: {},
      feedbacks: [],
      facebook_link: "",
      twitter_link: "",
      sessions: [
        {
          session_name: "",
          session_number: 0,
          date: "",
          time: "",
          content_desc: "",
          instructor_id: ""
        }
      ]
    },
    speaker: {},
    session_index: 0,
    speakersSearch: [],
    phase: [],
    error: "",
    phaseNum: "0"
  };
  componentDidMount() {
    const state = this.state;
    state.phase = phaseOne;
    this.setState({ state });
  }
  handleCahnge = handle(({ currentTarget: input }) => {
    const state = this.state;
    state.phaseNum === "1"
      ? (state.form.sessions[state.session_index][input.name] = input.value)
      : (state.form[input.name] = input.value);
    this.setState({ state });
  });
  handleSetImage = handle(pic => {
    const state = this.state;
    state.form["cover_photo"] = pic[0];
    this.setState({ state });
  });
  handleChangePhase = handle(({ currentTarget: element }) => {
    const state = this.state;
    state.phaseNum = element.id;
    if (element.id === "0") state.phase = phaseOne;
    if (element.id === "1") state.phase = phaseTwo;
    if (element.id === "2") state.phase = phaseThree;
    this.setState({ state });
  });

  handleSearch = handle(async ({ currentTarget: element }) => {
    const state = this.state;
    state.speakersSearch = (await getUserByName(element.value)).data;
    this.setState({ state });
  });
  handleChooseSpeaker = handle(async ({ currentTarget: element }) => {
    const state = this.state;
    console.log(element.id);
    state.form.sessions[state.session_index].instructor_id = element.id;
    state.speakersSearch = [];
    state.speaker = (await getUserById(element.id)).data;
    this.setState({ state });
  });
  handleChooseSession = handle(({ currentTarget: element }) => {
    const state = this.state;
    state.session_index = element.id;
    this.setState({ state });
  });
  handleAddSession = handle(() => {
    const state = this.state;
    const result = validateSession(state.form.sessions[state.session_index]);
    if (result) {
      state.error = result;
    } else {
      state.error = "";
      state.session_index = parseInt(state.session_index) + 1;
      state.form.sessions[state.session_index] = {
        session_name: "",
        session_number: 0,
        date: "",
        time: "",
        content_desc: "",
        instructor_id: ""
      };
    }
    this.setState({ state });
  });
  deleteSpeaker = handle(() => {
    const state = this.state;
    state.form.sessions[state.session_index].instructor_id = "";
    this.setState({ state });
  });
  handleSubmit = handle(async e => {
    e.preventDefault();
    if (admin()) {
      const state = this.state;
      const form = state.form;
      let token = getToken();
      const result = validateEvent({
        name: form.name,
        date: form.date,
        location: form.location,
        cover_photo: form.cover_photo,
        facebook_link: form.facebook_link,
        twitter_link: form.twitter_link,
        sessions: form.sessions.slice(0, form.sessions.length - 1)
      });
      if (!result) {
        const response = await saveEvent(
          {
            name: form.name,
            date: form.date,
            location: form.location,
            cover_photo: form.cover_photo,
            facebook_link: form.facebook_link,
            twitter_link: form.twitter_link,
            sessions: form.sessions.slice(0, form.sessions.length - 1)
          },
          token
        );
        if (response.error) state.error = response.error.message;
        if (response.data) {
          await saveEventImage(form.cover_photo, response.data, token);
        }
      } else state.error = result;
      this.setState({ state });
    }
  });
  render() {
    const {
      form,
      phase,
      error,
      phaseNum,
      speakersSearch,
      session_index,
      speaker
    } = this.state;
    console.log(speaker);
    return (
      <React.Fragment>
        <div className="page-section bg-dark d-flex justify-content-center">
          <div className="row mt-5 w-100">
            <div className="col-sm-1"></div>
            <div className="col-sm-10 bg-white mx-2 newEventForm">
              <div className="row">
                <div className="col-sm-2 align-items-center justify-content-center">
                  <div className="list text-center px-0 py-5 bg-darkBlue">
                    <div
                      className="form_list_item"
                      id="0"
                      onClick={this.handleChangePhase}
                    >
                      <i
                        className={
                          phaseNum === "0"
                            ? "icon current fa fa-info-circle"
                            : "icon fa fa-info-circle"
                        }
                        aria-hidden="true"
                      ></i>
                    </div>
                    <div
                      className="form_list_item"
                      id="1"
                      onClick={this.handleChangePhase}
                    >
                      <i
                        className={
                          phaseNum === "1"
                            ? "fas fa-chalkboard-teacher icon current"
                            : "fa fa-chalkboard-teacher icon"
                        }
                        aria-hidden="true"
                      ></i>
                    </div>
                    <div
                      className="form_list_item"
                      id="2"
                      onClick={this.handleChangePhase}
                    >
                      <i
                        className={
                          phaseNum === "2"
                            ? "fa fa-bullhorn icon current"
                            : "fa fa-bullhorn icon"
                        }
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <h3 className="text-dark text-right p-3 mx-5">Devmix Org</h3>
                  <div className="row">
                    <div className="col-sm-11">
                      <form>
                        <React.Fragment>
                          <h5 className="text-dark fw-b">
                            {phaseNum === "0" ? (
                              "Basic Info"
                            ) : phaseNum === "1" ? (
                              <React.Fragment>
                                Sessions & Activities &nbsp;
                                <mark className="text-center p-2">
                                  {parseInt(session_index) + 1}
                                </mark>
                              </React.Fragment>
                            ) : phaseNum === "2" ? (
                              "SCCIAL MEDIA"
                            ) : phaseNum === "3" ? (
                              "ORGANIZING"
                            ) : (
                              ""
                            )}
                          </h5>
                          <div
                            style={{ listStyleType: "none" }}
                            className="p-0"
                          >
                            {phase.map(item => {
                              return (
                                <div className="py-3" key={item.label}>
                                  {item.html === "input" && (
                                    <React.Fragment>
                                      <h6 className="Label">{item.label}</h6>
                                      <input
                                        name={item.name}
                                        type={item.type}
                                        value={
                                          phaseNum === "1"
                                            ? form.sessions[session_index][
                                                item.name
                                              ]
                                            : form[item.name]
                                        }
                                        className="border border-top-0 border-right-0 border-left-0 w-75 br-dark"
                                        onChange={this.handleCahnge}
                                        placeholder={item.placeholder}
                                      />
                                    </React.Fragment>
                                  )}

                                  {item.html === "textarea" && (
                                    <React.Fragment>
                                      <h6 className="Label">{item.label}</h6>
                                      <textarea
                                        name={item.name}
                                        type={item.type}
                                        value={
                                          phaseNum === "1"
                                            ? form.sessions[session_index][
                                                item.name
                                              ]
                                            : form[item.name]
                                        }
                                        className="border border-top-0 border-right-0 border-left-0 w-75 br-dark"
                                        onChange={this.handleCahnge}
                                        placeholder={item.placeholder}
                                      />
                                    </React.Fragment>
                                  )}
                                  {item.html === "image" && (
                                    <React.Fragment>
                                      <h6 className="Label">{item.label}</h6>
                                      <ImageUploader
                                        withIcon={true}
                                        value={this.state.form.cover_photo}
                                        onChange={this.handleSetImage}
                                        imgExtension={[
                                          ".jpg",
                                          ".png",
                                          ".jpeg",
                                          ".gif"
                                        ]}
                                        buttonText="Choose Image"
                                        withPreview={true}
                                        label="Max Size:5mb, Accepted: jpg/png/jpeg/gif"
                                        maxFileSize={5242880}
                                      />
                                    </React.Fragment>
                                  )}
                                  {item.html === "select" && (
                                    <React.Fragment>
                                      <h6 className="Label">{item.label}</h6>
                                      <select
                                        name={item.name}
                                        className="bg-white border border-top-0 border-right-0 border-left-0 w-75 br-dark"
                                        value={form[item.name]}
                                        onChange={this.handleCahnge}
                                      >
                                        <option>choose a field</option>
                                        {item.options.map(value => {
                                          return (
                                            <option key={value} value={value}>
                                              {value}
                                            </option>
                                          );
                                        })}
                                      </select>
                                    </React.Fragment>
                                  )}
                                  {item.html === "search" && (
                                    <React.Fragment>
                                      <h6 className="Label">{item.label}</h6>
                                      {form.sessions[session_index]
                                        .instructor_id.length === 0 && (
                                        <React.Fragment>
                                          <div>
                                            <input
                                              type={item.type}
                                              name={item.name}
                                              placeholder={item.placeholder}
                                              onChange={this.handleSearch}
                                              className="bg-white border border-top-0 border-right-0 border-left-0 w-75 br-dark"
                                            />
                                            <ul className="list-group col-sm-9">
                                              {speakersSearch &&
                                                speakersSearch.map(item => (
                                                  <li
                                                    onClick={
                                                      this.handleChooseSpeaker
                                                    }
                                                    className="list-group-item hover-gray"
                                                    key={item._id}
                                                    id={item._id}
                                                  >
                                                    <img
                                                      src={
                                                        item.profile_photo
                                                          ? item.profile_photo
                                                              .url
                                                          : userImage
                                                      }
                                                      style={{
                                                        width: "40px",
                                                        height: "40px"
                                                      }}
                                                      alt=""
                                                      className="brd-100"
                                                    />
                                                    {item.name}
                                                  </li>
                                                ))}
                                            </ul>
                                          </div>
                                        </React.Fragment>
                                      )}
                                      {form.sessions[session_index]
                                        .instructor_id.length > 0 && (
                                        <React.Fragment>
                                          <div className="align-items-center row  border br-dark brd-5 w-50">
                                            <img
                                              src={
                                                speaker.profile_photo
                                                  ? speaker.profile_photo.url
                                                  : userImage
                                              }
                                              alt={speaker.name}
                                              style={{
                                                height: "46px",
                                                width: "46px"
                                              }}
                                              className="brd-100"
                                            />
                                            <h5>{speaker.name}</h5>
                                            <button
                                              type="button"
                                              className="ml-auto bg-transparent border-0 f-32 p-0 pb-2"
                                              data-dismiss="toast"
                                              aria-label="Close"
                                              onClick={this.deleteSpeaker}
                                            >
                                              <span aria-hidden="true">
                                                &times;
                                              </span>
                                            </button>
                                          </div>
                                        </React.Fragment>
                                      )}
                                    </React.Fragment>
                                  )}
                                  {item.html === "button" &&
                                    item.type === "submit" && (
                                      <button
                                        className="form-control w-auto btn btn-outline-dark"
                                        type={item.type}
                                        onClick={this.handleSubmit}
                                      >
                                        {item.label}
                                      </button>
                                    )}
                                  {item.html === "button" && phaseNum === "1" && (
                                    <div
                                      className="form-control w-auto btn btn-outline-dark"
                                      onClick={this.handleAddSession}
                                    >
                                      {item.label}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </React.Fragment>
                      </form>
                      {error && <h6 className="alert">{error}</h6>}
                    </div>
                    {phaseNum === "1" && (
                      <React.Fragment>
                        <div className="col-sm-1 pt-5">
                          <ul className="p-0 m-0">
                            {form.sessions.map(item => (
                              <li
                                onClick={this.handleChooseSession}
                                id={form.sessions.indexOf(item)}
                                key={form.sessions.indexOf(item)}
                                className={
                                  form.sessions.indexOf(item) ===
                                  this.state.session_index
                                    ? "bg-bottomDark text-white brd-100 text-center session_num mt-2 active_session"
                                    : "bg-bottomDark text-white brd-100 text-center session_num mt-2"
                                }
                              >
                                {form.sessions.indexOf(item) + 1}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </React.Fragment>
                    )}
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

export default AddEvent;
