import React, { Component } from "react";
import UploadImage from "./uploadImage";
import EditProfile from "./editProfile";
import UserImage from "../../../assets/user.png";
import { getUserById } from "../../../httpServices/user/user";
import { owner } from "../../../httpServices/auth/auth";
import { updateUser, changePassword } from "../../../httpServices/user/user";
import { getToken } from "../../../httpServices/localStorage";
import {
  validateUpdateUser,
  validateChangePassword
} from "../../../httpServices/user/UserJoiSchema";
import ProfileEvents from "./profileEvents";
import ProfileAsks from "./profileAks";
import "./user.css";

class Profile extends Component {
  state = {
    user: {},
    passwordData: { password: "", newPassword: "", confirmPassword: "" },
    status: "",
    errors: {},
    passwordError: {}
  };
  async componentDidMount() {
    try {
      const state = this.state;
      const id = this.props.match.params.id;
      const user = await getUserById(id);
      if (user.error) window.location = "/";
      state.user = user.data;
      this.setState({ state });
    } catch (ex) {
      alert(ex);
    }
  }
  handleEdit = ({ currentTarget: e }) => {
    const state = this.state;
    state.status = e.id;
    this.setState({ state });
  };
  handleChangeValue = ({ currentTarget: e }) => {
    const state = this.state;
    state.user[e.name] = e.value;
    this.setState({ state });
  };
  handleChangePassword = ({ currentTarget: e }) => {
    const state = this.state;
    state.passwordData[e.name] = e.value;
    let result = validateChangePassword(state.passwordData);
    if (result) state.passwordError = result;
    else state.passwordError = {};
    if (state.passwordData.newPassword !== state.passwordData.confirmPassword)
      state.passwordError = {
        message: "Password is not confirmed",
        key: "not confirmed password"
      };
    else state.passwordError = {};
    this.setState({ state });
  };
  handleSaveProfile = async () => {
    const state = this.state;
    state.status = "";
    const user = {
      short_desc: state.user.short_desc,
      long_desc: state.user.long_desc,
      linkngedIn: state.user.linkngedIn,
      twitter: state.user.twitter,
      facebook: state.user.facebook,
      github: state.user.github,
      phone: state.user.phone,
      address: state.user.address
    };
    const result = validateUpdateUser(user);
    if (!result) {
      const response = await updateUser(user, getToken());
      if (response.error) state.errors = response.error;
      else state.user = response.data;
    } else state.errors = result;
    this.setState({ state });
  };
  handleSavePassword = async () => {
    const state = this.state;
    let error = validateChangePassword(state.passwordData);
    if (!error) {
      let data = {
        oldPassword: state.passwordData.password,
        newPassword: state.passwordData.newPassword
      };
      let result = await changePassword(data, getToken());
      if (result.error) state.passwordError = result.error;
      else {
        state.passwordError = {};
        state.passwordData = {};
        alert("Changed Successfully.");
        this.setState({ state });
      }
      this.setState({ state });
    } else {
      state.passwordError = error;
      this.setState({ state });
    }
  };
  render() {
    const { user, status, errors, passwordData, passwordError } = this.state;
    const id = this.props.match.params.id;
    return (
      <React.Fragment>
        <div className="bg-gray">
          <div className="page-section bg-dark text-white text-left header" />
          <div className="page-section bg-gray">
            <div className="container">
              <div className="row p-4 profile bg-white">
                <div className="col-lg-7">
                  <img
                    src={
                      user && user.profile_photo
                        ? user.profile_photo.url
                        : UserImage
                    }
                    style={{ height: "600px" }}
                    className="profile_photo w-100"
                    alt=""
                  />
                  {owner(id) && <UploadImage id={id} />}
                </div>
                <div className="col justify-content-left text-left pl-3 pt-5">
                  <div className="text-left">
                    <p>HELLO EVERYBODY, I AM</p>
                    <h1 className="fw-b text-uppercase">{user && user.name}</h1>
                    {user && user.short_desc && status !== "short_desc" ? (
                      <div className="custom-control-inline by-3">
                        <h5 className="fw-b">{user.short_desc}</h5>
                        {owner(id) && (
                          <i
                            className="fa fa-plus bg-gray brd-100 p-1 cursor-p h-100 f-12 bg-gray ml-2"
                            aria-hidden="true"
                            id="short_desc"
                            onClick={this.handleEdit}
                          ></i>
                        )}
                      </div>
                    ) : (
                      <EditProfile
                        id={id}
                        label="Short Description"
                        inputClassName="brd-trans width-80"
                        type="input"
                        value={user && user.short_desc}
                        inputName="short_desc"
                        handleEdit={this.handleEdit}
                        changeValue={this.handleChangeValue}
                        saveProfile={this.handleSaveProfile}
                        status={status}
                        placeholder="short description"
                      />
                    )}
                  </div>
                  <div className="py-3">
                    {user && user.long_desc && status !== "long_desc" ? (
                      <div className="custom-control-inline w-100">
                        <p className="text-gray">{user && user.long_desc}</p>
                        {owner(id) && (
                          <i
                            className="fa fa-plus bg-gray brd-100 p-1 cursor-p h-100 f-12 bg-gray ml-2"
                            aria-hidden="true"
                            onClick={this.handleEdit}
                            id="long_desc"
                          ></i>
                        )}
                      </div>
                    ) : (
                      <EditProfile
                        id={id}
                        label="Long Description"
                        inputClassName="brd-trans  width-90"
                        type="textarea"
                        value={user && user.long_desc}
                        inputName="long_desc"
                        handleEdit={this.handleEdit}
                        changeValue={this.handleChangeValue}
                        saveProfile={this.handleSaveProfile}
                        status={status}
                        placeholder="long description"
                      />
                    )}
                  </div>
                  <div className="col p-0 py-3 text-gray custom-control-inline">
                    {user && user.phone && (
                      <i
                        className="fa fa-phone-alt text-dark pt-1 pr-4"
                        aria-hidden="true"
                      ></i>
                    )}
                    {user && user.phone && status !== "phone" ? (
                      <React.Fragment>
                        {user && user.phone}
                        {owner(id) && (
                          <i
                            className="fa fa-plus bg-gray brd-100 p-1 cursor-p h-100 f-12 bg-gray ml-2"
                            aria-hidden="true"
                            onClick={this.handleEdit}
                            id="phone"
                          ></i>
                        )}
                      </React.Fragment>
                    ) : (
                      <EditProfile
                        id={id}
                        label="Phone"
                        inputClassName="brd-trans width-80"
                        type="input"
                        value={user && user.phone}
                        inputName="phone"
                        handleEdit={this.handleEdit}
                        changeValue={this.handleChangeValue}
                        saveProfile={this.handleSaveProfile}
                        status={status}
                        placeholder="phone"
                      />
                    )}
                  </div>
                  <div className="col p-0 py-2 text-gray custom-control-inline">
                    {user && user.address && (
                      <i
                        className="fa fa-home text-dark pt-1 pr-4"
                        aria-hidden="true"
                      ></i>
                    )}
                    {user && user.address && status !== "address" ? (
                      <React.Fragment>
                        {user && user.address}
                        {owner(id) && (
                          <i
                            className="fa fa-plus bg-gray brd-100 p-1 cursor-p h-100 f-12 bg-gray ml-2"
                            aria-hidden="true"
                            id="address"
                            onClick={this.handleEdit}
                          ></i>
                        )}
                      </React.Fragment>
                    ) : (
                      <EditProfile
                        id={id}
                        label="Address"
                        inputClassName="brd-trans width-80"
                        type="input"
                        value={user && user.address}
                        inputName="address"
                        handleEdit={this.handleEdit}
                        changeValue={this.handleChangeValue}
                        saveProfile={this.handleSaveProfile}
                        status={status}
                        placeholder="address"
                      />
                    )}
                  </div>
                  <div className="col p-0 py-2 text-gray custom-control-inline">
                    {user && user.email && (
                      <React.Fragment>
                        <i
                          className="fa fa-at text-dark pt-1 pr-4"
                          aria-hidden="true"
                        ></i>
                        {user && user.email}
                      </React.Fragment>
                    )}
                  </div>
                  <div className="col p-0 py-2 text-gray custom-control-inline">
                    {user && owner(id) && (
                      <React.Fragment>
                        <i
                          className="fa fa-key text-dark pt-1 pr-4"
                          aria-hidden="true"
                        ></i>
                        <button
                          href="#"
                          className="btn p-0 m-0 text-dark cursor-p"
                          data-toggle="modal"
                          data-target="#changePassword"
                        >
                          Change Password
                        </button>
                      </React.Fragment>
                    )}
                  </div>
                  <div className="col p-0 py-2 text-danger custom-control-inline">
                    <p>{errors && errors.message}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProfileEvents id={id} />
          <ProfileAsks userPhoto={user && user.profile_photo} id={id} />
        </div>
        <div
          className="modal fade mt-5"
          id="changePassword"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog mt-5 " role="document">
            <div className="modal-content bg-dark text-white brd-3 border-0">
              <div className="modal-header border-0">
                <h5 className="modal-title" id="exampleModalLabel">
                  Change Password
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
                  type="password"
                  name="password"
                  value={passwordData.password}
                  onChange={this.handleChangePassword}
                  className="form-control my-2 brd-2 f-18"
                  id="password"
                  placeholder="your Password"
                  required
                  data-validation-required-message="Please enter your password."
                  aria-invalid="false"
                />
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={this.handleChangePassword}
                  className="form-control my-2 brd-2 f-18"
                  id="newPassword"
                  placeholder="New Password"
                  required
                  data-validation-required-message="Please enter your new password."
                  aria-invalid="false"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={this.handleChangePassword}
                  className="form-control my-2 brd-2 f-18"
                  id="confirmPassword"
                  placeholder="Confirm New Password"
                  required
                  data-validation-required-message="Please confirm your new password."
                  aria-invalid="false"
                />
                {passwordError && passwordError.message && (
                  <p className="py-2 text-white">{passwordError.message}</p>
                )}
              </div>
              <div className="modal-footer border-0">
                <button
                  className="btn form-control bg-danger py-2"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn form-control bottomDark by-2"
                  onClick={this.handleSavePassword}
                  disabled={passwordError.message ? true : false}
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

export default Profile;
