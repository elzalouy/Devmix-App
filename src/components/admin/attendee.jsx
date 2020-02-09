import React, { Component } from "react";
import { paginate } from "../../utils/paginate";
import Pagination from "../../components/common/pagination/pagination";
import {
  confirmAttendee,
  deleteAttendees
} from "../../httpServices/event/attendees";
import { getToken } from "../../httpServices/localStorage";
import { sendMailList } from "../../httpServices/mail/mail";
const _ = require("lodash");
class Attendee extends Component {
  state = {
    currentPage: 1,
    pageSize: 6,
    event: {},
    searchVal: "",
    filtered: [],
    selectedAttendees: [],
    SendMail: false,
    mail: ""
  };
  componentDidMount() {
    const state = this.state;
    state.event = this.props.event;
    this.setState({ state });
  }
  handleAttend = async ({ currentTarget: e }) => {
    const state = this.state;
    let event = state.event.attendees.find(s => s._id === e.id);
    const result = await confirmAttendee(event.event, event.user, getToken());
    if (result.error) return alert(result.error.message);
    else event.confirm = true;
    this.setState({ state });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSearch = ({ currentTarget: e }) => {
    const state = this.state;
    state.searchVal = e.value;
    this.setState({ state });
  };
  getPagedData = () => {
    const { pageSize, currentPage, event, searchVal } = this.state;
    let filtered = event.attendees;
    if (searchVal && searchVal.length > 0) {
      filtered = _.filter(filtered, s =>
        s.username.toLowerCase().includes(searchVal)
      );
    }
    filtered = paginate(filtered, currentPage, pageSize);
    return {
      totalCount: event.attendees ? event.attendees.length : 0,
      data: filtered
    };
  };
  handleSelect = ({ currentTarget: e }) => {
    const state = this.state;
    state.selectedAttendees.includes(e.value)
      ? _.remove(state.selectedAttendees, s => s === e.value)
      : state.selectedAttendees.push(e.value);
    this.setState({ state });
  };
  handleSelectAll = ({ currentTarget: e }) => {
    const state = this.state;
    if (e.checked)
      state.event.attendees.map(item => state.selectedAttendees.push(item._id));
    else state.selectedAttendees = [];
    this.setState({ state });
  };
  handleDelete = async ({ currentTarget: e }) => {
    const state = this.state;
    if (state.selectedAttendees.length > 0) {
      const result = await deleteAttendees(state.selectedAttendees, getToken());
      if (result.error) return alert(result.error.message);
      state.selectedAttendees.forEach(item => {
        _.remove(state.event.attendees, s => s._id === item);
      });
      this.setState({ state });
    }
  };
  handleEditMail = async ({ currentTarget }) => {
    const state = this.state;
    state.SendMail = state.SendMail === true ? false : true;
    state.mail = "";
    this.setState({ state });
  };

  handleSendMail = async ({ currentTarget: e }) => {
    const state = this.state;
    let ids = [];
    for (let i = 0; i < state.selectedAttendees.length; i++) {
      let attendee = state.event.attendees.find(
        s => s._id === state.selectedAttendees[i]
      );
      ids.push(attendee.user);
    }
    const result = await sendMailList(ids, state.mail, getToken());
    if (result.error) return alert(result.error.message);
    state.mail = "";
    state.SendMail = false;
    this.setState({ state });
  };

  handleCancel = ({ currentTarget: e }) => {
    const state = this.state;
    state.SendMail = false;
    state.mail = "";
    this.setState({ state });
  };
  handlechange = ({ currentTarget: e }) => {
    const state = this.state;
    state.mail = e.value;
    this.setState({ state });
  };
  render() {
    if (!this.state.event || !this.state.event.attendees) return null;
    const {
      currentPage,
      pageSize,
      searchVal,
      selectedAttendees,
      SendMail
    } = this.state;
    const { name: EventName } = this.state.event;
    const { display, handleChoose, tableId } = this.props;
    const { totalCount, data: attendees } = this.getPagedData();
    let eventiId = attendees && attendees.length > 0 ? attendees[0].event : "0";
    return (
      <div className="row justify-content-center mt-5">
        <div className="col-md-12 justify-content-center">
          <div className="shadow text-left overflow_hidden brd-3 bg-white">
            <div className="shadow row bg-darkBlue text-white cursor-p p-2 m-0">
              <h2
                onClick={handleChoose}
                id={eventiId}
                className="col p-0 m-0 text-uppercase"
              >
                {EventName}
              </h2>
              <div className="col custom-control-inline justify-content-center align-items-center">
                <input
                  className="form-control bg-trans text-white border-top-0 border-right-0 border-left-0 brd-0"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={this.handleSearch}
                  value={searchVal}
                />
                <i className="fa fa-search f-24 px-3" aria-hidden="true"></i>
              </div>
            </div>
            <React.Fragment>
              {display &&
                tableId === eventiId &&
                attendees &&
                attendees.length > 0 && (
                  <React.Fragment>
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th>User Name</th>
                          <th className="text-center">Confirm</th>
                          <th className="text-center">
                            Select All &nbsp;{" "}
                            <input
                              type="checkbox"
                              onChange={this.handleSelectAll}
                            />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {attendees.map(item => (
                          <tr key={item._id}>
                            <td>{item.username}</td>
                            <td className="text-center p-1 m-0 ">
                              {item.confirm ? (
                                <i
                                  className="fa fa-check bg-dark p-1 brd-100 cursor-p mr-3"
                                  aria-hidden="true"
                                ></i>
                              ) : (
                                <button
                                  className="btn bottomDark p-1 m-0"
                                  onClick={this.handleAttend}
                                  id={item._id}
                                >
                                  confirm
                                </button>
                              )}
                            </td>
                            <td className="text-center">
                              <input
                                className=""
                                type="checkbox"
                                name="attendee"
                                onChange={this.handleSelect}
                                value={item._id}
                                checked={
                                  selectedAttendees.includes(item._id)
                                    ? true
                                    : false
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {this.state.selectedAttendees &&
                      this.state.selectedAttendees.length > 0 &&
                      !SendMail && (
                        <React.Fragment>
                          <div className="row container py-1 px-2">
                            <div className="col-12 text-right">
                              <i
                                className="fas fa-trash bottomDark cursor-p p-2 mx-2 brd-1"
                                onClick={this.handleDelete}
                              ></i>
                              <i
                                className="fa fa-paper-plane cursor-p bottomDark p-2 mx-2 brd-1"
                                onClick={this.handleEditMail}
                              ></i>
                            </div>
                          </div>
                        </React.Fragment>
                      )}
                    {SendMail && (
                      <React.Fragment>
                        <div className="container">
                          <div className="row">
                            <div className="form-group col-12 mt-3">
                              <textarea
                                className="form-control"
                                placeholder="Write your mail"
                                name="mail"
                                value={this.state.mail}
                                onChange={this.handlechange}
                                rows="3"
                              ></textarea>
                              <button
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
                          </div>
                        </div>
                      </React.Fragment>
                    )}
                    <div className="row justify-content-center px-3">
                      <Pagination
                        onPageChange={this.handlePageChange}
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                      />
                    </div>
                  </React.Fragment>
                )}
            </React.Fragment>
          </div>
        </div>
      </div>
    );
  }
}
export default Attendee;
