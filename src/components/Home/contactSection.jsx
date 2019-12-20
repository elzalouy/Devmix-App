import React, { Component } from "react";
import HeadTitle from "../common/headTitle/headTitle";
import { validateContact } from "../../httpServices/contact/contactJoiSchema";
import { addNewContact } from "../../httpServices/contact/contact";
const handle = require("../../middleware/errorHandle");
class ContactSection extends Component {
  state = {
    contactRequest: {
      name: "",
      email: "",
      phone: "",
      message: ""
    },
    error: {}
  };
  handleChange = handle(({ currentTarget: element }) => {
    const state = this.state;
    state.contactRequest[element.name] = element.value;
    this.setState({ state });
  });
  handleSubmit = handle(async e => {
    e.preventDefault();
    const state = this.state;
    const result = validateContact(state.contactRequest);
    if (!result) {
      const result = await addNewContact(state.contactRequest);
      if (result.error) state.error = result.error;
      else {
        alert("The message sent.");
        window.location.reload();
      }
    }
    this.setState({ state });
  });
  render() {
    const { contactRequest, error } = this.state;
    return (
      <div className="page-section text-center">
        <HeadTitle label="contact us" color="#2c3e50" size="48px" />
        <div className="container">
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
              <form onSubmit={this.handleSubmit}>
                <div className="control-group mt-5">
                  <div className="form-group mb-0 pb-2">
                    <div className="row">
                      <div className="col-sm-2"></div>
                      <div className="col-sm-8">
                        <input
                          name="name"
                          type="text"
                          className="form-control brd-4 f-18"
                          id="name"
                          placeholder="name"
                          required
                          data-validation-required-message="Please enter your name."
                          aria-invalid="false"
                          value={contactRequest.name}
                          onChange={this.handleChange}
                        />
                        <p className="help-message"></p>
                      </div>
                      <div className="col-sm-2"></div>
                      <div className="col-sm-2"></div>
                      <div className="col-sm-8">
                        <input
                          name="email"
                          type="email"
                          className="form-control brd-4 f-18"
                          id="email"
                          placeholder="Email"
                          required
                          data-validation-required-message="Please enter your email."
                          aria-invalid="false"
                          value={contactRequest.email}
                          onChange={this.handleChange}
                        />
                        <p className="help-message"></p>
                      </div>
                      <div className="col-sm-2"></div>
                      <div className="col-sm-2"></div>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="phone"
                          className="form-control brd-4 f-18"
                          id="phone"
                          placeholder="phone"
                          required
                          data-validation-required-message="Please enter your phone number."
                          aria-invalid="false"
                          value={contactRequest.phone}
                          onChange={this.handleChange}
                        />
                        <p className="help-message"></p>
                      </div>
                      <div className="col-sm-2"></div>
                      <div className="col-sm-2"></div>
                      <div className="col-sm-8">
                        <textarea
                          type="text"
                          className="form-control brd-4 f-18"
                          name="message"
                          id="message"
                          rows="5"
                          columns="10"
                          placeholder="message"
                          data-validation-required-message="Please enter your message."
                          value={contactRequest.message}
                          onChange={this.handleChange}
                        ></textarea>
                        <p className="help-message text-danger">
                          {error && error.message}
                        </p>
                      </div>
                      <div className="col-sm-2"></div>
                      <div className="col-sm-4"></div>
                      <div className="col-sm-4">
                        <button
                          type="submit"
                          className="form-control btn btn-outline-dark f-32 brd-4"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ContactSection;
