import React, { Component } from "react";
import { Link } from "react-router-dom";
import loginImg from "../../assets/login.svg";
import { login } from "../../httpServices/auth/auth";
const handle = require("../../middleware/errorHandle");
class Login extends Component {
  state = {
    acc: { email: "", password: "" },
    errors: { key: "", message: "" }
  };
  handleSubmit = e => {
    e.preventDefault();
  };
  handleCahnge = handle(({ currentTarget: input }) => {
    const state = this.state;
    state.acc[input.name] = input.value;
    this.setState({ state });
  });
  handleSubmit = handle(async e => {
    e.preventDefault();
    const state = this.state;
    const { email, password } = this.state.acc;
    const response = await login(email, password);
    if (response.error) {
      state.errors = response.error;
      this.setState({ state });
    }
    if (response.data) window.location.href = "/";
  });
  render() {
    const { acc, errors } = this.state;
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
                <div className="col-sm-4 mb-2">
                  <input
                    type="email"
                    name="email"
                    value={acc.email}
                    onChange={this.handleCahnge}
                    className="form-control brd-2 f-18"
                    id="email"
                    placeholder="Email"
                    required
                    data-validation-required-message="Please enter your Email."
                    aria-invalid="false"
                  />
                  <p className="help-message mb-2"></p>
                </div>
                <div className="col-sm-4"></div>
                <div className="col-sm-4"></div>
                <div className="col-sm-4 mb-2">
                  <input
                    type="password"
                    name="password"
                    value={acc.password}
                    onChange={this.handleCahnge}
                    className="form-control brd-2 f-18"
                    id="password"
                    placeholder="Password"
                    required
                    data-validation-required-message="Please enter your password."
                    aria-invalid="false"
                  />
                  <p className="help-message mb-2">
                    {errors && errors.message}
                  </p>
                </div>
                <div className="col-sm-4"></div>
                <div className="col-sm-4"></div>
                <div className="col-sm-4 mb-2">
                  <button
                    type="submit"
                    className="form-control btn btn-outline-light f-32 brd-2"
                  >
                    Login
                  </button>
                </div>
                <div className="col-sm-4"></div>
                <div className="col-sm-4"></div>
                <div className="col-sm-2 mt-2">
                  <Link to="/forgotPassword" className="text-white">
                    forgot password ..!
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Login;
