import React, { Component } from "react";
import Stats from "./stats";
import { admin, authed } from "../../httpServices/auth/auth";
import userImg from "../../assets/user.png";
import { getDate } from "../../utils/formatDate";
import {
  getAsks,
  getNotAnswered,
  AnswerQuestion,
  deleteQuestion
} from "../../httpServices/ask/ask";
import { getUserByToken } from "../../httpServices/user/user";
import { validateAsk } from "../../httpServices/ask/askJoiSchema";
import { getToken } from "../../httpServices/localStorage";
import isAdmin from "../../middleware/admin";
import { paginate } from "../../utils/paginate";
import Pagination from "../../components/common/pagination/pagination";
import handle from "../../middleware/errorHandle";
const _ = require("lodash");

class AskList extends Component {
  state = {
    allasks: [],
    filtered: [],
    listError: {},
    formError: {},
    active: "all",
    questionId: "",
    answer: "",
    status: "view",
    currentPage: 1,
    pageSize: 5
  };
  async componentDidMount() {
    try {
      const state = this.state;
      const asks = await getAsks();
      if (asks.error) state.listError = asks.error;
      else state.allasks = state.filtered = asks.data;
      this.setState({ state });
    } catch (ex) {
      alert(ex);
    }
  }
  handlePageChange = page => {
    this.setState({ currentPage: page, contact_item: null });
  };
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
  getPagedData = () => {
    const { pageSize, currentPage, filtered } = this.state;
    let Filtered = paginate(filtered, currentPage, pageSize);
    return { totalCount: filtered ? filtered.length : 0, allAsks: Filtered };
  };
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
    const state = this.state;
    state.status = "view";
    state.questionId = "";
    state.answer = "";
    state.formError = {};
    state.listError = {};
    this.setState({ state });
  });
  render() {
    const {
      active,
      questionId,
      status,
      formError,
      pageSize,
      currentPage
    } = this.state;
    let { totalCount, allAsks } = this.getPagedData();
    return (
      <div className="page-section justify-content-center align-items-center bg-gray text-center text-black">
        <div className="container pt-2">
          <div className="row m-0">
            <div className="col-md-8 p-0">
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
                    There are no asks until now.
                  </mark>
                </div>
              )}
              {allAsks &&
                allAsks.length > 0 &&
                allAsks.map(item => {
                  const { day, month, year } = getDate(item.date);
                  console.log(item);
                  return (
                    <div
                      key={item && item._id}
                      className="bg-white brd-2 justify-content-center container my-4 shadow"
                    >
                      <div className="row pt-3">
                        <div className="col-1 mr-5">
                          <img
                            id={item && item.user_id}
                            src={
                              item && item.user_photo
                                ? item.user_photo.url
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
                                <div className="text-right col-md-1 mx-2">
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
              <div className="row justify-content-center">
                <Pagination
                  onPageChange={this.handlePageChange}
                  itemsCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                />
              </div>
            </div>
            <Stats />
          </div>
        </div>
      </div>
    );
  }
}

export default AskList;
