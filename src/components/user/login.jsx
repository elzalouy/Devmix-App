import React, { Component } from "react";
import loginImg from "../../assets/login.svg";
import { login } from "../../httpServices/auth/auth";
import { ForgotPassword } from "../../httpServices/user/user";
const handle = require("../../middleware/errorHandle");
class Login extends Component {
  state = {
    acc: { email: "", password: "" },
    errors: { key: "", message: "" },
    forgotPassword: ""
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
  handleForgotPassword = async () => {
    const state = this.state;
    let email = state.acc.email;
    let result = await ForgotPassword(email);
    if (result.error) {
      alert(result.error.message);
    } else {
      alert(result.data);
      this.setState({ state });
      window.location.reload();
    }
  };
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
                <div
                  className="col-sm-2 mt-2"
                  data-toggle="modal"
                  data-target="#forgetPassword"
                >
                  <button className="btn text-white cursor-p">
                    forgot password ..!
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div
          className="modal fade my-5"
          id="forgetPassword"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog mt-5" role="document">
            <div className="modal-content bg-dark brd-3 text-white">
              <div className="modal-header border-0">
                <h5 className="modal-title" id="exampleModalLabel">
                  Send Mail
                </h5>
                <button
                  type="button"
                  className="close text-white"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body border-0">
                <input
                  type="email"
                  name="email"
                  value={acc.email}
                  onChange={this.handleCahnge}
                  className="form-control brd-2 f-18"
                  id="email"
                  placeholder="enter your email"
                  required
                  data-validation-required-message="Please enter your email."
                  aria-invalid="false"
                />
              </div>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-secondary py-2"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn bottomDark py-2"
                  onClick={this.handleForgotPassword}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Login;
