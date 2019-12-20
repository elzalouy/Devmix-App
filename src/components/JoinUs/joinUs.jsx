import React, { Component } from "react";
import { ValidateJoinForm } from "../../httpServices/join/joinJoiSchema";
import { addJoinRequest } from "../../httpServices/join/joinForm";
import { phaseOne, phaseTwo, phaseThree, phaseFour } from "./phases";
import "../JoinUs/joinUs.css";
const handle = require("../../middleware/errorHandle");
class JoinUs extends Component {
  state = {
    form: {
      fullName: "",
      email: "",
      school: "",
      experience: "",
      career: "",
      fields: "",
      languages: "",
      linkedin: "",
      freelanceSite: "",
      OrganizationField: "",
      fieldExperience: ""
    },
    phase: [],
    error: {},
    phaseNum: "0"
  };

  componentDidMount() {
    const state = this.state;
    state.phase = phaseOne;
    this.setState({ state });
  }

  handleCahnge = handle(({ currentTarget: input }) => {
    const state = this.state;
    state.form[input.name] = input.value;
    this.setState({ state });
  });

  handleChangePhase = handle(({ currentTarget: element }) => {
    const state = this.state;
    state.phaseNum = element.id;
    if (element.id === "0") state.phase = phaseOne;
    if (element.id === "1") state.phase = phaseTwo;
    if (element.id === "2") state.phase = phaseThree;
    if (element.id === "3") state.phase = phaseFour;
    this.setState({ state });
  });
  handleSubmit = handle(async e => {
    e.preventDefault();
    const state = this.state;
    state.error = ValidateJoinForm(state.form);
    if (!state.error) {
      const result = await addJoinRequest(state.form);
      if (result.error) {
        state.error = result.error;
        alert("Server not responding:" + result.error.message);
      } else {
        alert("The form sent successfuly.");
        window.location = "/";
      }
    }
    this.setState({ state });
  });
  render() {
    const { form, phase, error, phaseNum } = this.state;
    return (
      <React.Fragment>
        <div className="page-section bg-dark d-flex justify-content-center">
          <div className="row mt-5 w-100">
            <div className="col-sm-1"></div>
            <div className="col-sm-10 bg-white join_form mx-2">
              <div className="row">
                <div className="col-sm-2 align-items-center justify-content-center">
                  <div className="list text-center px-0 py-5 bg-darkBlue">
                    <div
                      className="join_item"
                      id="0"
                      onClick={this.handleChangePhase}
                    >
                      <i
                        className={
                          phaseNum === "0"
                            ? "icon current fa fa-question-circle"
                            : "icon fa fa-question-circle"
                        }
                        aria-hidden="true"
                      ></i>
                    </div>
                    <div
                      className="join_item"
                      id="1"
                      onClick={this.handleChangePhase}
                    >
                      <i
                        className={
                          phaseNum === "1"
                            ? "fa fa-code icon current"
                            : "fa fa-code icon"
                        }
                        aria-hidden="true"
                      ></i>
                    </div>
                    <div
                      className="join_item"
                      id="2"
                      onClick={this.handleChangePhase}
                    >
                      <i
                        className={
                          phaseNum === "2"
                            ? "fa fa-clipboard icon current"
                            : "fa fa-clipboard icon"
                        }
                        aria-hidden="true"
                      ></i>
                    </div>

                    <div
                      className="join_item"
                      id="3"
                      onClick={this.handleChangePhase}
                    >
                      <i
                        className={
                          phaseNum === "3"
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
                  <form onSubmit={this.handleSubmit}>
                    <React.Fragment>
                      <h5 className="text-dark fw-b">
                        {phaseNum === "0"
                          ? "Basic Info"
                          : phaseNum === "1"
                          ? "Your Field & Interests"
                          : phaseNum === "2"
                          ? "JOB MEDIA"
                          : phaseNum === "3"
                          ? "ORGANIZING"
                          : ""}
                      </h5>
                      <div style={{ listStyleType: "none" }} className="p-0">
                        {phase.map(item => {
                          return (
                            <div className="py-3" key={item.label}>
                              {item.html === "input" && (
                                <React.Fragment>
                                  <h6 className="Label">{item.label}</h6>
                                  <input
                                    name={item.name}
                                    type={item.type}
                                    value={form[item.name]}
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
                                    value={form[item.name]}
                                    className="border border-top-0 border-right-0 border-left-0 w-75 br-dark"
                                    onChange={this.handleCahnge}
                                    placeholder={item.placeholder}
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
                              {item.html === "button" && (
                                <button
                                  className="form-control w-auto btn btn-outline-dark"
                                  type={item.type}
                                >
                                  {item.label}
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </React.Fragment>
                  </form>
                  {error && <h6 className="alert">{error.message}</h6>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default JoinUs;
