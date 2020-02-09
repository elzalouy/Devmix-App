import React, { Component } from "react";
import userImg from "../../assets/user.png";
import { getUserByName } from "../../httpServices/user/user";
import { AddNewAdmin } from "../../httpServices/user/user";
import { getToken } from "../../httpServices/localStorage";
class AddAdmin extends Component {
  state = { users: [], newAdmin: null, searchVal: "" };
  handleChange = async ({ currentTarget: e }) => {
    const state = this.state;
    state.searchVal = e.value;
    const user = await getUserByName(state.searchVal);
    if (user.error) return alert(user.error.message);
    state.users = user.data;
    this.setState({ state });
  };
  chooseUser = ({ currentTarget: e }) => {
    const state = this.state;
    state.newAdmin = state.users.find(s => s._id === e.id);
    this.setState({ state });
  };
  deleteNewAdmin = () => {
    const state = this.state;
    state.newAdmin = null;
    this.setState({ state });
  };
  handleAddAdmin = async () => {
    const state = this.state;
    const result = await AddNewAdmin(state.newAdmin._id, getToken());
    if (result.error) return alert(result.error.message);
    state.newAdmin = null;
    state.searchVal = "";
    state.users = null;
    this.setState({ state });
    window.location.reload();
  };
  render() {
    const { users, newAdmin: user } = this.state;
    return (
      <React.Fragment>
        <div className="container row justify-content-center align-items-center">
          <div className="text-white cursor-p hover_bottomDark f-48">
            <i
              className="fa fa-plus-circle"
              aria-hidden="true"
              data-toggle="modal"
              data-target="#myModal"
            ></i>
          </div>
        </div>
        <div className="modal" id="myModal">
          <div className="modal-dialog ">
            <div className="modal-content brd-3">
              <div className="modal-header">
                <h4 className="modal-title">New Admin</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body form-group">
                {!user ? (
                  <React.Fragment>
                    <label htmlFor="Admin Name">Name</label>
                    <input
                      type="text"
                      value={this.state.searchVal}
                      onChange={this.handleChange}
                      placeholder="search for user"
                      className="border-top-0 border-right-0 border-left-0  form-control brd-0 border-dark"
                    />
                    <div className="Search">
                      {users && users.length > 0 && (
                        <ul className="list-group">
                          {users.map(item => (
                            <li
                              onClick={this.chooseUser}
                              className="list-group-item hover-gray"
                              key={item._id}
                              id={item._id}
                            >
                              <img
                                src={
                                  item && item.profile_photo
                                    ? item.profile_photo.url
                                    : userImg
                                }
                                style={{ width: "40px", height: "40px" }}
                                alt=""
                                className="brd-100"
                              />{" "}
                              {item && item.name ? item.name : ""}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className="align-items-center row  border br-dark brd-5 w-50">
                      <img
                        src={
                          user && user.profile_photo
                            ? user.profile_photo.url
                            : userImg
                        }
                        alt={user && user.name ? user.name : ""}
                        style={{ height: "46px", width: "46px" }}
                        className="brd-100"
                      />
                      <h5>{user && user.name ? user.name : ""}</h5>
                      <button
                        type="button"
                        className="ml-auto bg-transparent border-0 f-32 p-0 pb-2"
                        data-dismiss="toast"
                        aria-label="Close"
                        onClick={this.deleteNewAdmin}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  </React.Fragment>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn bottomDark"
                  onClick={this.handleAddAdmin}
                >
                  Add Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddAdmin;
