import React, { Component } from "react";
import userImg from "../../../assets/user.png";
import HeadTitle from "../../common/headTitle/headTitle";
import { owner } from "../../../httpServices/auth/auth";
import { getUserAsks } from "../../../httpServices/ask/ask";
import { getToken } from "../../../httpServices/localStorage";
import { getDate } from "../../../utils/formatDate";
import { userDeleteAsk } from "../../../httpServices/ask/ask";
const _ = require("lodash");
class ProfileAsks extends Component {
  state = { userAsks: [], errors: {} };
  async componentDidMount() {
    const state = this.state;
    const result = await getUserAsks(this.props.id);
    if (result.error) state.errors = result.error;
    else state.userAsks = result.data;
    this.setState({ state });
  }
  handleDeleteAsk = async ({ currentTarget: e }) => {
    const state = this.state;
    const result = await userDeleteAsk(e.id, getToken());
    if (result.error) state.errors = result.error;
    else _.remove(state.userAsks, s => s._id === e.id);
    this.setState(state);
  };
  render() {
    const { profile_photo, user_id } = this.props;
    const { userAsks } = this.state;
    return (
      <div className="page-section bg-dark">
        <div className="container">
          <div className="row p-0 m-0 mx-4 justify-content-center align-items-center">
            <HeadTitle label="your Asks" color="#2c3e50" size="54px" />
            {userAsks &&
              userAsks.map(item => {
                const { day, month, year } = getDate(item.date);
                return (
                  <React.Fragment key={item._id}>
                    <div className="bg-white brd-2 justify-content-center container my-4 shadow">
                      <div className="row pt-3">
                        <div className="col-1 mr-5">
                          <img
                            src={profile_photo ? profile_photo.url : userImg}
                            alt=""
                            className="askImage border border-success"
                          />
                        </div>
                        <div className="col text-left p-0 m-0  ml-3">
                          <div className="row">
                            <h4 className="col w-90">
                              <i
                                className="fa fa-question text-white bg-dark m-0  p-1 mb-1 f-14"
                                aria-hidden="true"
                              ></i>{" "}
                              {item.question}
                            </h4>
                            {owner(user_id) && (
                              <div className="text-right col-md-1 mx-2">
                                <i
                                  className="fa fa-ellipsis-h ellipsis f-18 text-black"
                                  aria-hidden="true"
                                  data-toggle="dropdown"
                                ></i>
                                <div className="dropdown-menu">
                                  <button
                                    className="dropdown-item"
                                    id={item._id}
                                    onClick={this.handleDeleteAsk}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                          <h6 className="text-gray w-90 p-0 m-0">
                            {item.answer}
                          </h6>
                          <br />
                          <hr className="m-0" />
                          <div className="row m-0 p-0  text-left py-2">
                            <p className="text-left p-0 m-0 mx-1 f-12">
                              <i className="fas fa-clock"></i>
                              &nbsp; {day}/{month}/{year}
                            </p>
                            <p className="text-left p-0 m-0 ml-4 f-12">
                              <i
                                className="fa fa-user-secret"
                                aria-hidden="true"
                              ></i>
                              &nbsp; answered by:{" "}
                              {item.adminname ? item.adminname : "Unknown"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileAsks;
