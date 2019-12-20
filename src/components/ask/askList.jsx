import React, { Component } from "react";
import { admin, authed } from "../../httpServices/auth/auth";
import userImg from "../../assets/user.png";
import { getDate } from "../../utils/formatDate";
import {
  getAsks,
  getNotAnswered,
  AnswerQuestion,
  getAsksCount,
  deleteQuestion
} from "../../httpServices/ask/ask";
import { getUserByToken } from "../../httpServices/user/user";
import { validateAsk } from "../../httpServices/ask/askJoiSchema";
import { getToken } from "../../httpServices/localStorage";
import isAdmin from "../../middleware/auth";
const handle = require("../../middleware/errorHandle");
const _ = require("lodash");

class AskList extends Component {
  state = {
    allasks: [],
    KnownasksCount: 0,
    unknowAsksCount: 0,
    filtered: [],
    asksFrom: 0,
    asksTo: 20,
    listError: {},
    formError: {},
    active: "all",
    questionId: "",
    answer: "",
    status: "view"
  };
  async componentDidMount() {
    try {
      const state = this.state;
      const asks = await getAsks(state.asksFrom, state.asksTo);
      if (asks.error) state.listError = asks.error;
      else state.allasks = state.filtered = asks.data;
      const count = await getAsksCount();
      if (count.error) state.listError = count.error;
      else {
        state.unknowAsksCount = count.data.unknownCount;
        state.KnownasksCount = count.data.knownCount;
      }
      this.setState({ state });
    } catch (ex) {
      alert(ex);
    }
  }

  handleFilterQuestions = handle(async ({ currentTarget: e }) => {
    const state = this.state;
    state.active = e.id;
    let user = getUserByToken();
    if (state.active === "my")
      state.filtered = _.filter(
        state.allasks,
        s => s.user_id && s.user_id === user._id
      );
    if (state.active === "all") state.filtered = state.allasks;
    if (state.active === "notAnswered" && admin()) {
      const result = await getNotAnswered(getToken());
      if (result.error) state.listError = result.error;
      else state.filtered = result.data;
    }
    state.questionId = "";
    state.status = "view";
    this.setState({ state });
  });
  handleChangeStatus = handle(
    isAdmin(({ currentTarget: e }) => {
      const state = this.state;
      state.questionId = e.id;
      state.status = "edit";
      this.setState({ state });
    })
  );
  handleChangeAnswer = handle(
    isAdmin(async ({ currentTarget: e }) => {
      const state = this.state;
      const index = state.filtered.indexOf(
        state.filtered.find(s => s._id === state.questionId)
      );
      state.filtered[index].answer = e.value;
      this.setState({ state });
    })
  );
  handleDeleteQuestion = handle(
    isAdmin(async ({ currentTarget: e }) => {
      const state = this.state;
      const result = await deleteQuestion(e.id, getToken());
      if (result.error) {
        state.listError = result.error;
        this.setState({ state });
      } else {
        window.location.reload();
      }
    })
  );
  handleAnswerQuestion = handle(
    isAdmin(async () => {
      const state = this.state;
      const index = state.filtered.indexOf(
        state.filtered.find(s => s._id === state.questionId)
      );
      let ask = {
        answer: state.filtered[index].answer,
        question: state.filtered[index].question,
        date: state.filtered[index].date,
        user_id: state.filtered[index].user_id
      };
      const error = validateAsk(ask);
      console.log(error);
      if (error) state.formError = error.message;
      else {
        const result = await AnswerQuestion(state.questionId, ask, getToken());
        if (result.error) state.FormError = result.error;
        else {
          this.setState({ state });
          window.location.reload();
        }
      }
    })
  );
  hanldeCancel = handle(() => {
    window.location.reload();
  });
  render() {
    const {
      filtered: allAsks,
      active,
      questionId,
      unknowAsksCount,
      KnownasksCount,
      status,
      formError
    } = this.state;
    return (
      <div className="page-section justify-content-center align-items-center bg-gray text-center text-black">
        <div className="container pt-2">
          <div className="row  m-0">
            <div className="col-sm-8 p-0">
              <ul className="row custom-control-inline w-100 text-left p-0 m-0 nav-tabs border-top-0 border-right-0 border-left-0 border border-success border-2">
                <li
                  key="all"
                  name="all"
                  id="all"
                  className={
                    active === "all"
                      ? "nav-item p-0 m-0 cursor-p active"
                      : "nav-item p-0 m-0 cursor-p"
                  }
                  onClick={this.handleFilterQuestions}
                >
                  <p className="nav-link text-black border-w-0 brd-0 m-0">
                    ALL QUESTIONS
                  </p>
                </li>
                {authed() && (
                  <li
                    key="my"
                    name="my"
                    id="my"
                    className={
                      active === "my"
                        ? "nav-item p-0 m-0 cursor-p active"
                        : "nav-item p-0 m-0 cursor-p"
                    }
                    onClick={this.handleFilterQuestions}
                  >
                    <p className="nav-link text-black border-w-0 brd-0 m-0">
                      MY QUESTIONS
                    </p>
                  </li>
                )}
                {admin() && (
                  <li
                    key="notAnswered"
                    name="notAnswered"
                    id="notAnswered"
                    className={
                      active === "notAnswered"
                        ? "nav-item m-0 cursor-p active"
                        : "nav-item m-0 cursor-p"
                    }
                    onClick={this.handleFilterQuestions}
                  >
                    <p className="nav-link text-black border-w-0 brd-0 m-0">
                      NOT ANSWERED
                    </p>
                  </li>
                )}
              </ul>
              {allAsks && allAsks.length === 0 && (
                <div className="mt-5 text-center">
                  <mark className="container col pt-1 w-50 justify-content-center mt-5">
                    There no asks until now.
                  </mark>
                </div>
              )}
              {allAsks &&
                allAsks.length > 0 &&
                allAsks.map(item => {
                  const { day, month, year } = getDate(item.date);
                  return (
                    <div
                      key={item && item._id}
                      className="bg-white justify-content-center container my-4 shadow"
                    >
                      <div className="row pt-3">
                        <div className="col-1 mr-5">
                          <img
                            id={item && item.user_id}
                            src={
                              item && item.user_photo
                                ? item.user_photo
                                : userImg
                            }
                            alt=""
                            className="askImage border border-success"
                          />
                        </div>
                        <div className="col text-left p-0 m-0  ml-3">
                          <div className="row">
                            <h4 className="w-90 col">
                              {item && (
                                <React.Fragment>
                                  <i
                                    className="fa fa-question text-white bg-dark m-0  p-1 mb-1 f-14"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  {item.question}
                                </React.Fragment>
                              )}
                            </h4>
                            {admin() && (
                              <React.Fragment>
                                <div className="text-right col-1 mx-2">
                                  <i
                                    className="fa fa-ellipsis-h ellipsis f-18 text-black"
                                    aria-hidden="true"
                                    data-toggle="dropdown"
                                  ></i>
                                  <div className="dropdown-menu">
                                    <button
                                      id={item._id}
                                      className="dropdown-item"
                                      onClick={this.handleDeleteQuestion}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </React.Fragment>
                            )}
                          </div>

                          <h6 className="text-gray w-90 p-0 m-0">
                            {item && item.answer && item._id !== questionId ? (
                              <React.Fragment>{item.answer}</React.Fragment>
                            ) : (
                              <React.Fragment>
                                {admin() && (
                                  <React.Fragment>
                                    {status === "edit" &&
                                    questionId === item._id ? (
                                      <div className="text-right">
                                        <textarea
                                          id={item._id}
                                          type="text"
                                          name="answer"
                                          value={item.answer ? item.answer : ""}
                                          onChange={this.handleChangeAnswer}
                                          rows="6"
                                          className="text-gray w-100 brd-trans p-0 m-0"
                                          placeholder="answer the question here"
                                        />
                                        {formError.length > 0 && (
                                          <p className="text-dark f-12">
                                            {formError}
                                          </p>
                                        )}
                                        <button
                                          className="btn text-white bg-darkBlue mt-2"
                                          onClick={this.handleAnswerQuestion}
                                        >
                                          Answer
                                        </button>
                                        <button
                                          onClick={this.hanldeCancel}
                                          className="btn btn-info ml-2 mt-2"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="text-right">
                                        <button
                                          id={item._id}
                                          name={item._id}
                                          className="btn text-white bg-darkBlue mt-2"
                                          onClick={this.handleChangeStatus}
                                        >
                                          Answer
                                        </button>
                                      </div>
                                    )}
                                  </React.Fragment>
                                )}
                              </React.Fragment>
                            )}
                          </h6>
                          <br />
                          <hr className="m-0" />
                          <div className="row m-0 p-0  text-left py-2">
                            <p className="text-left p-0 m-0 mx-1 f-12">
                              <i className="fas fa-clock"></i>
                              &nbsp; {day}/{month}/{year}
                            </p>
                            <p className="text-left p-0 m-0 mx-1 f-12">
                              <i className="fas fa-user-alt"></i>
                              &nbsp;{" "}
                              {item && item.username
                                ? item.username
                                : "Unknown"}
                            </p>
                            {item.answer && status === "view" && (
                              <p className="text-left p-0 m-0 ml-4 f-12">
                                <i
                                  className="fa fa-user-secret"
                                  aria-hidden="true"
                                ></i>
                                &nbsp; answered by:{" "}
                                {item && item.adminname
                                  ? item.adminname
                                  : "Unknown"}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="col-sm-4">
              <div className="bg-white mx-5 py-2 justify-content-center container text-left shadow">
                <h5 className="text-dark fw-b pt-1">Stats</h5>
                <hr className="pt-1" />
                <div className="custom-control-inline w-100 bg-gray pl-2 mb-2 py-2">
                  <i
                    className="fa fa-question bg-dark p-2"
                    aria-hidden="true"
                  ></i>
                  <p className="p-0 m-0 pt-1 ml-2 fw-b">
                    Unknown Questions ( {unknowAsksCount} )
                  </p>
                </div>
                <div className="custom-control-inline w-100 bg-gray pl-2 mb-2 py-2">
                  <i className="fas fa-user bg-dark p-2   "></i>
                  <p className="p-0 m-0 pt-1 ml-2 fw-b">
                    known Questions ( {KnownasksCount} )
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AskList;
