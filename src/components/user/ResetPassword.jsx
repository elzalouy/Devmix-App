import React, { Component } from "react";
import loginImg from "../../assets/login.svg";
import { ResetForgotPassword } from "../../httpServices/user/user";
class ResetPassword extends Component {
  state = { newPassword: "", confirm: "", token: "", error: "" };
  handleChange = ({ currentTarget: e }) => {
    const state = this.state;
    state[e.name] = e.value;
    if (state.newPassword !== state.confirm)
      state.error = "Password are not confirmed";
    this.setState({ state });
  };
  handleSubmit = async () => {
    const state = this.state;
    const token = this.props.match.params.token;
    const result = await ResetForgotPassword(state.newPassword, token);
    if (result.error) return alert(result.error.message);
    state.newPassword = state.token = state.confirm = "";
    this.setState({ state });
    window.location.replace("/login");
  };
  render() {
    const { newPassword, confirm } = this.state;
    return (
      <React.Fragment>
        <div className="page-section bg-dark text-white text-center">
          <div className="align-items-center">
            <img
              src={loginImg}
              alt=""
              className="mb-3"
              style={{ height: "255px", width: "240px" }}
            />
            <div className="row mx-auto">
              <div className="col-sm-4"></div>
              <div className="col-sm-4 mb-2">
                <input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={this.handleChange}
                  className="form-control brd-2 f-18"
                  id="password"
                  placeholder="your new password"
                  required
                  data-validation-required-message="Please enter your new password."
                  aria-invalid="false"
                />
              </div>
              <div className="col-sm-4"></div>
              <div className="col-sm-4"></div>
              <div className="col-sm-4 mb-2">
                <input
                  type="password"
                  name="confirm"
                  value={confirm}
                  onChange={this.handleChange}
                  className="form-control brd-2 f-18"
                  id="confirm"
                  placeholder="confirm password"
                  required
                  data-validation-required-message="Please confirm your new password."
                  aria-invalid="false"
                />
              </div>
              <div className="col-sm-4"></div>
              <div className="col-sm-4"></div>
              <div className="col-sm-4 mb-2">
                <button
                  type="submit"
                  className="form-control btn btn-outline-light f-32 brd-2"
                  onClick={this.handleSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default ResetPassword;
