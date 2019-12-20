import React, { Component } from "react";
import askImage from "../../assets/avataaars.svg";
import { authed } from "../../httpServices/auth/auth";
import { validateAsk } from "../../httpServices/ask/askJoiSchema";
import { saveAsk } from "../../httpServices/ask/ask";
import { getUserByToken } from "../../httpServices/user/user";
const handle = require("../../middleware/errorHandle");
class AskForm extends Component {
  state = {
    anonymous: true,
    ask: { question: "" },
    error: {},
    textCount: 2000
  };
  handleChangeAnony = handle(() => {
    const state = this.state;
    state.anonymous = state.anonymous === true ? false : true;
    this.setState({ state });
  });
  handleChangeAsk = handle(({ currentTarget: e }) => {
    const state = this.state;
    state.ask.question = e.value;
    state.textCount = 2000 - e.value.length;
    this.setState({ state });
  });
  handleSubmitAsk = handle(async () => {
    const state = this.state;
    const user = getUserByToken();
    const ask = {
      question: state.ask.question,
      answer: null,
      date: Date.now(),
      user_id: state.anonymous ? null : user._id
    };
    const result = validateAsk(ask);
    if (result) state.error = result;
    else {
      state.error = {};
      const response = await saveAsk(ask);
      if (response.error) state.error = response.error;
      else {
        state.error = {};
        alert("Send to the admin successfuly.");
        window.location.reload();
      }
    }
    this.setState({ state });
  });
  render() {
    const { anonymous, ask, error, textCount } = this.state;
    return (
      <div className="page-section justify-content-center align-items-center bg-dark text-white text-center">
        <div className="container  py-5">
          <div className="row py-5 justify-content-center ">
            <img
              src={askImage}
              alt=""
              className="col-sm-4 text-center"
              style={{ height: "255px", width: "240px" }}
            />
            <div className="col-sm-8 ">
              <div className=" mt-4 bg-black-dark brd-1 p-3">
                <p className="f-18 text-left">
                  <mark className="brd-1 p-1 mr-3">
                    <i className="fa fa-question" aria-hidden="true"></i>
                  </mark>
                  Question
                </p>
                <textarea
                  name="question"
                  value={ask.quesion}
                  onChange={this.handleChangeAsk}
                  type="text"
                  className="form-control brd-trans brd-2 f-18"
                  maxLength="2000"
                />
                {error && <p className="text-white f-12">{error.message}</p>}
                <div className="row m-0 p-0 w-100">
                  <div className="col m-0 p-0 pt-2 mt-1 text-left custom-control-inline">
                    {authed() && (
                      <React.Fragment>
                        <i
                          className={
                            anonymous
                              ? "fa fa-toggle-on text-darkBlue cursor-p f-24"
                              : "fa fa-toggle-off text-darkBlue cursor-p f-24"
                          }
                          aria-hidden="true"
                          onClick={this.handleChangeAnony}
                        />
                        <p className="text-whiteGray f-12 pl-1 pt-1">
                          <span className="text-white">Ask Anonymously</span>
                        </p>
                      </React.Fragment>
                    )}
                  </div>
                  <div className="col p-0 m-0 text-right custom-control-inline justify-content-end">
                    <p className="text-dark p-0 m-0 text-inline pr-2 pt-3">
                      {textCount}
                    </p>
                    <button
                      className="btn text-white m-0 bg-darkBlue mt-2"
                      onClick={this.handleSubmitAsk}
                    >
                      Send &nbsp;
                      <i className="fa fa-paper-plane" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AskForm;
