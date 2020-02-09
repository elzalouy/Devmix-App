import React, { Component } from "react";
import { sendMail } from "../../httpServices/mail/mail";
import { validateMail } from "../../httpServices/mail/mailSchema";
import { getToken } from "../../httpServices/localStorage";

class JoinForm extends Component {
  state = {
    index: 0,
    FormSize: 3,
    sendMail: false,
    mail: ""
  };
  handleWriteMail = ({ currentTarget: e }) => {
    const state = this.state;
    state.mail = e.value;
    this.setState({ state });
  };
  handleChangeIndex = ({ currentTarget: e }) => {
    const state = this.state;
    state.index = e.id === "1" ? state.index + 1 : state.index - 1;
    state.index = state.index > state.FormSize ? 0 : state.index;
    state.index = state.index < 0 ? 3 : state.index;
    this.setState({ state });
  };
  handleEditMail = async () => {
    const state = this.state;
    state.sendMail = state.sendMail === true ? false : true;
    this.setState({ state });
  };
  handleSendMail = async ({ currentTarget: e }) => {
    const state = this.state;
    const email = this.props.item.email;
    const data = { email: email, mail: state.mail };
    const result = validateMail(data);
    if (result) state.errors = result;
    else {
      const result = await sendMail(data, getToken());
      if (result.error) state.errors = result.error;
      else {
        state.sendMail = false;
        state.mail = "";
        alert("Email sent successfuly.");
      }
    }
    this.setState({ state });
  };
  handleCancel = async ({ currentTarget: e }) => {
    const state = this.state;
    state.sendMail = false;
    state.mail = "";
    this.setState({ state });
  };
  render() {
    if (!this.props.item) return null;
    const { item, hanleDeleteForm } = this.props;
    const { index, sendMail } = this.state;
    return (
      <div className="col-md-6">
        <div className="shadow mx-0 my-3 brd-3 bg-white overflow_display p-2">
          <div className="m-top-3 text-center mb-2">
            <i
              className="fa fa-arrow-left cursor-p f-24 bottomDark p-1 mx-1 brd-100"
              aria-hidden="true"
              id="0"
              onClick={this.handleChangeIndex}
            ></i>
            <i
              className="fa fa-arrow-right cursor-p f-24  bottomDark p-1 mx-1 brd-100"
              aria-hidden="true"
              id="1"
              onClick={this.handleChangeIndex}
            ></i>
            <i
              className="fas fa-trash  cursor-p f-24 bottomDark p-1 mx-1 brd-100"
              aria-hidden="true"
              id={item._id}
              onClick={hanleDeleteForm}
            ></i>
          </div>
          {index === 0 && (
            <React.Fragment>
              <h3 className="text-dark f-18 fw-b">(1) Basic Info</h3>
              <div className="ml-1">
                <h6 className="Label mt-3">FULL NAME</h6>
                <h6 className="border border-top-0 border-right-0 border-left-0 br-dark text-gray text-uppercase">
                  {item.fullName}
                </h6>
                <h6 className="Label mt-3">EMIAL</h6>
                <h6 className="border border-top-0 border-right-0 border-left-0 br-dark text-gray">
                  {item.email}
                </h6>
                <h6 className="Label mt-3">SCHOOL / COLLEGE</h6>
                <h6 className="border border-top-0 border-right-0 border-left-0 br-dark text-gray">
                  {item.school}
                </h6>

                <h6 className="Label mt-3">EXPERIENCE WITH VOLUNTEERING</h6>
                <h6 className="border border-top-0 border-right-0 border-left-0 br-dark text-gray">
                  {item.experience}
                </h6>
              </div>
            </React.Fragment>
          )}
          {index === 1 && (
            <React.Fragment>
              <h3 className="text-dark f-18 fw-b">(2) Fields & Interests</h3>
              <div className="ml-1">
                <h6 className="Label mt-3">
                  CAREER HE LOVES, LEARNS, AND WORKS IT
                </h6>
                <h6 className="border border-top-0 border-right-0 border-left-0 br-dark text-gray">
                  {item.career}
                </h6>
                <h6 className="Label mt-3">FIELDS HE IS LEARNING</h6>
                <h6 className="border border-top-0 border-right-0 border-left-0 br-dark text-gray">
                  {item.fields}
                </h6>
                <h6 className="Label mt-3">LANGUAGES HE IS SPEAKING</h6>
                <h6 className="border border-top-0 border-right-0 border-left-0 br-dark text-gray">
                  {item.languages}
                </h6>
              </div>
            </React.Fragment>
          )}
          {index === 2 && (
            <React.Fragment>
              <h3 className="text-dark f-18 fw-b">(3) JOB MEDIA</h3>
              <h6 className="Label mt-3">LINKEDIN PROFILE</h6>
              <h6 className="border border-top-0 border-right-0 border-left-0 br-dark text-gray">
                {item.linkedin}
              </h6>
              <h6 className="Label mt-3">UPWORK / FREELANCE SITE PROFILE</h6>
              <h6 className="border border-top-0 border-right-0 border-left-0 br-dark text-gray">
                {item.freelanceSite}
              </h6>
            </React.Fragment>
          )}
          {index === 3 && (
            <React.Fragment>
              <h3 className="text-dark f-18 fw-b">(4) ORGANIZING</h3>
              <h6 className="Label mt-3">ORGANIZING FIELD HE HOPES</h6>
              <h6 className="border border-top-0 border-right-0 border-left-0 br-dark text-gray">
                {item.OrganizationField}
              </h6>
              <h6 className="Label mt-3">YOUR EXPERIENCE IN THIS FIELD</h6>
              <h6 className="border border-top-0 border-right-0 border-left-0 br-dark text-gray">
                {item.fieldExperience}
              </h6>
            </React.Fragment>
          )}
          {sendMail && (
            <div className="form-group mt-3">
              <textarea
                className="form-control"
                placeholder="Write your mail"
                name="mail"
                onChange={this.handleWriteMail}
                value={this.state.mail}
                id={item._id}
                rows="3"
              ></textarea>
              <button
                id={item.id}
                className="btn brd-3 bottomDark border-0 mt-2"
                onClick={this.handleSendMail}
              >
                Send
              </button>
              <button
                className="btn text-white mx-2 brd-3 bg-danger mt-2 p-2"
                onClick={this.handleCancel}
              >
                Cancel
              </button>
            </div>
          )}
          {!sendMail && (
            <div className="text-right m-3">
              <button
                className="btn bottomDark brd-3"
                onClick={this.handleEditMail}
              >
                Send Mail
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default JoinForm;
