import React, { Component } from "react";
import HeadTitle from "../common/headTitle/headTitle";
import { getAllContacts } from "../../httpServices/contact/contact";
import { getToken } from "../../httpServices/localStorage";
import Pagination from "../../components/common/pagination/pagination";
import { paginate } from "../../utils/paginate";
import { deleteContact } from "../../httpServices/contact/contact";
import { sendMail } from "../../httpServices/mail/mail";
import { validateMail } from "../../httpServices/mail/mailSchema";
const _ = require("lodash");
class Contacts extends Component {
  state = {
    contacts: [],
    errors: {},
    contact_item: null,
    currentPage: 1,
    pageSize: 5,
    sendMail: false,
    mail: ""
  };
  async componentDidMount() {
    const state = this.state;
    const contacts = await getAllContacts(getToken());
    if (contacts.error) state.errors = contacts.error;
    else state.contacts = contacts.data;
    this.setState({ state });
  }
  handleChoose = ({ currentTarget: e }) => {
    const state = this.state;
    state.contact_item = e.id;
    this.setState({ state });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page, contact_item: null });
  };
  getPagedData = () => {
    const { pageSize, currentPage, contacts } = this.state;
    let filtered = contacts;
    filtered = paginate(contacts, currentPage, pageSize);
    return { totalCount: contacts ? contacts.length : 0, data: filtered };
  };
  handleDeleteContact = async ({ currentTarget: e }) => {
    const state = this.state;
    const result = await deleteContact(getToken(), e.id);
    if (result.error) state.errors = result.error;
    else {
      _.remove(state.contacts, s => s._id === e.id);
    }
    this.setState({ state });
  };
  handleEditEmail = ({ currentTarget: e }) => {
    const state = this.state;
    state.sendMail = state.sendMail === true ? false : true;
    this.setState({ state });
  };
  handleChangeValue = ({ currentTarget: e }) => {
    const state = this.state;
    state[e.name] = e.value;
    this.setState({ state });
  };
  handleCancel = () => {
    const state = this.state;
    state.sendMail = false;
    this.setState({ state });
  };
  handleSendMail = async ({ currentTarget: e }) => {
    const state = this.state;
    const email = _.find(state.contacts, s => s._id === e.id).email;
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

  render() {
    const { length: count } = this.state.contacts ? this.state.contacts : [];
    const { contact_item, currentPage, pageSize, sendMail, mail } = this.state;
    const { totalCount, data: contacts } = this.getPagedData();
    return (
      <div className="page-section bg-gray">
        <HeadTitle label="Archive" color="#2c3e50" size="64px" />
        <div className="container mt-5">
          {count === 0 ? (
            <p className="text-gray f-24 text-center">
              There are no any contacts right now.
            </p>
          ) : (
            <div className="row justify-content-center mt-5">
              <div className="shadow h-100 brd-3 bg-bottomDark text-white p-0 w-100 mt-5 mb-1">
                <div className="row w-100 m-0 px-3 p-4 custom-control-inline">
                  <h3 className="col text-left">Contact Messages</h3>
                  <i className="fas fa-hand-holding-heart px-2 col f-32 text-right"></i>
                </div>
              </div>
              {contacts.length > 0 &&
                contacts.map(item => {
                  return (
                    <div
                      key={item._id}
                      className="h-100 shadow brd-3 bg-white p-2 w-100  mb-1"
                    >
                      <div
                        onClick={this.handleChoose}
                        data-toggle="collapse"
                        className="cursor-p m-0 px-3 p- custom-control-inline w-100 row"
                        id={item._id}
                      >
                        <div className="col p-0 m-0 custom-control-inline">
                          <p className="f-18 fw-b p-0 m-0">(1) {item.name}</p>
                          <p className=" text-gray p-0 m-0 pt-1 pl-3 f-12">
                            12/2/2019
                          </p>
                        </div>
                        <div className="col  text-right p-0 m-0">
                          <i
                            className="fas fa-trash-alt text-danger hover_f1 p-0 m-0 px-1"
                            id={item._id}
                            onClick={this.handleDeleteContact}
                          ></i>
                          <i
                            className="fas fa-edit text-success hover_f1 p-0 m-0 px-1"
                            id={item._id}
                            onClick={this.handleEditEmail}
                          ></i>
                        </div>
                      </div>
                      <div
                        className={
                          contact_item === item._id
                            ? "collapse show f-14 py-3 px-2"
                            : "collapse f-14 py-3 px-2"
                        }
                      >
                        <p className="text-gray">
                          <i
                            className="fa fa-at text-dark pr-4"
                            aria-hidden="true"
                          ></i>
                          {item.email}
                        </p>
                        <p className="text-gray">
                          <i
                            className="fa fa-phone text-dark pr-4"
                            aria-hidden="true"
                          ></i>
                          {item.phone}
                        </p>
                        <p className="text-gray">
                          <i
                            className="fa fa-sticky-note text-dark pr-4"
                            aria-hidden="true"
                          ></i>
                          {item.message}
                        </p>
                        {sendMail && item._id === contact_item && (
                          <React.Fragment>
                            <textarea
                              name="mail"
                              id={item._id}
                              className="w-100"
                              placeholder="enter your mail"
                              rows="10"
                              value={mail}
                              onChange={this.handleChangeValue}
                            ></textarea>
                            <button
                              onClick={this.handleSendMail}
                              id={item._id}
                              className="btn p-2 bg-dark text-white brd-2"
                            >
                              Send Mail
                            </button>
                            <button
                              onClick={this.handleCancel}
                              className="btn p-2 mx-2 bg-danger text-white brd-2"
                            >
                              Cancel
                            </button>
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                  );
                })}
              <Pagination
                onPageChange={this.handlePageChange}
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Contacts;
