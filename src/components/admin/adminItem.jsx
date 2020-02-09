import React, { Component } from "react";
import { sendMail } from "../../httpServices/mail/mail";
import { getToken } from "../../httpServices/localStorage";
import userImg from "../../assets/user.png";
import "./admin.css";
class AdminItem extends Component {
  state = { mail: "", sendMail: false };

  handleEditMail = async () => {
    const state = this.state;
    state.sendMail = true;
    state.mail = "";
    this.setState({ state });
  };
  handleChange = ({ currentTarget: e }) => {
    const state = this.state;
    state.mail = e.value;
    this.setState({ state });
  };
  handleCancel = () => {
    const state = this.state;
    state.mail = "";
    state.sendMail = false;
    this.setState({ state });
  };
  handleSendMail = async () => {
    let state = this.state;
    let email = this.props.item.email;
    let Mail = { email: email, mail: state.mail };
    let result = await sendMail(Mail, getToken());
    if (result.error) return alert(result.error.message);
    state.mail = "";
    state.sendMail = false;
    this.setState({ state });
  };
  render() {
    const { handleRemoveAdmin } = this.props;
    let { sendMail, mail } = this.state;
    let { item } = this.props;
    return (
      <React.Fragment>
        <div className="shadow brd-3 bg-white col-sm-4 overflow_hidden p-0 h-100">
          <img
            src={item.profile_photo.url ? item.profile_photo.url : userImg}
            className="admin_photo w-100"
            alt=""
          />
          <div className="p-3">
            <h3 className="text-dark">{item.name}</h3>
            <h6 className="text-gray">{item.email}</h6>
            {sendMail ? (
              <React.Fragment>
                <textarea
                  name="mail"
                  value={mail}
                  onChange={this.handleChange}
                  className="w-100"
                  rows="4"
                />
                <button
                  className="btn bottomDark p-2 brd-2 mx-1"
                  id={item._id}
                  onClick={this.handleSendMail}
                >
                  Send
                </button>
                <button
                  className="btn btn-danger p-2 brd-2 mx-1"
                  id={item._id}
                  onClick={this.handleCancel}
                >
                  Cancel
                </button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <button
                  className="btn bottomDark p-2 brd-2 mx-1"
                  id={item._id}
                  onClick={this.handleEditMail}
                >
                  Send Mail
                </button>
                <button
                  className="btn btn-danger p-2 brd-2 mx-1"
                  id={item._id}
                  onClick={handleRemoveAdmin}
                >
                  Remove Admin
                </button>
              </React.Fragment>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminItem;
