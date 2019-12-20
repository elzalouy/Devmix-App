import React, { Component } from "react";
import loginImg from "../../assets/login.svg";
import { validateUser } from "../../httpServices/user/UserJoiSchema";
import * as userService from "../../httpServices/user/user";
const handle = require("../../middleware/errorHandle");
class Register extends Component {
  state = {
    NewAcc: { name: "", email: "", password: "", gender: "" },
    confirmPassword: "",
    errors: { key: "", message: "" }
  };
  handleSubmit = handle(async e => {
    e.preventDefault();
    const state = this.state;
    if (state.errors && state.errors.message.length > 0) return 0;
    const response = await userService.addNewUser(this.state.NewAcc);
    if (response.error) state.errors = response.error;
    this.setState({ state });
    window.location.href = "/";
  });
  handleChange = handle(({ currentTarget: input }) => {
    const state = this.state;
    state.NewAcc[input.name] = input.value;
    const result = validateUser(state.NewAcc);
    state.errors = result;
    this.setState({ state });
  });
  confirmPassword = handle(({ currentTarget: e }) => {
    const state = this.state;
    state.confirmPassword = e.value;
    if (state.NewAcc.password !== e.value) {
      state.errors = {
        key: "password error",
        message: "password are confirmed"
      };
    } else state.errors = { key: "", message: "" };
    this.setState({ state });
  });
  render() {
    const { NewAcc, errors } = this.state;
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
            <form onSubmit={this.handleSubmit}>
              <div className="row mx-auto">
                <div className="col-sm-4"></div>
                <div className="col-sm-4 mb-1">
                  <input
                    name="name"
                    value={NewAcc.name}
                    onChange={this.handleChange}
                    type="text"
                    className="form-control brd-4 f-18"
                    id="name"
                    placeholder="name"
                    required
                    data-validation-required-message="Please enter your name."
                    aria-invalid="false"
                  />
                  <p className="help-message"></p>
                </div>
                <div className="col-sm-4"></div>
                <div className="col-sm-4"></div>
                <div className="col-sm-4 mb-1">
                  <input
                    type="email"
                    className="form-control brd-4 f-18"
                    id="email"
                    placeholder="Email"
                    required
                    data-validation-required-message="Email is required ."
                    aria-invalid="false"
                    name="email"
                    value={NewAcc.email}
                    onChange={this.handleChange}
                  />
                  <p className="help-message"></p>
                </div>
                <div className="col-sm-4"></div>
                <div className="col-sm-4"></div>
                <div className="col-sm-4 mb-1">
                  <select
                    type="text"
                    className="form-control brd-4 f-18"
                    id="gender"
                    placeholder="Gender"
                    required
                    data-validation-required-message="Gender is required ."
                    aria-invalid="false"
                    name="gender"
                    value={NewAcc.gender}
                    onChange={this.handleChange}
                  >
                    <option value="">select a gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <p className="help-message"></p>
                </div>

                <div className="col-sm-4"></div>
                <div className="col-sm-4"></div>
                <div className="col-sm-4 mb-1">
                  <input
                    type="password"
                    className="form-control brd-4 f-18"
                    id="password"
                    name="password"
                    placeholder="Pasword"
                    required
                    data-validation-required-message="Password is required ."
                    aria-invalid="false"
                    value={NewAcc.password}
                    onChange={this.handleChange}
                  />
                  <p className="help-message"></p>
                </div>

                <div className="col-sm-4"></div>
                <div className="col-sm-4"></div>
                <div className="col-sm-4 mb-1">
                  <input
                    type="password"
                    className="form-control brd-4 f-18"
                    id="confirm password"
                    placeholder="Confirm pasword"
                    required
                    data-validation-required-message="Password is required ."
                    aria-invalid="false"
                    name="confirmPassword"
                    value={NewAcc.confirmPassword}
                    onChange={this.confirmPassword}
                  />
                  <p className="help-message">
                    {errors &&
                      errors.message &&
                      errors.message &&
                      errors.message}
                  </p>
                </div>
                <div className="col-sm-4"></div>
                <div className="col-sm-4"></div>
                <div className="col-sm-4 mb-1">
                  <button
                    type="submit"
                    className="form-control btn btn-outline-light f-32 brd-4"
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Register;
