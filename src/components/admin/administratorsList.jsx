import React, { Component } from "react";
import { getAdmins } from "../../httpServices/user/user";
import { getToken } from "../../httpServices/localStorage";
import HeadTitle from "../common/headTitle/headTitle";
import AdminItem from "./adminItem";
import AddAdmin from "./addAdmin";
import { removeAdmin } from "../../httpServices/user/user";
import "./admin.css";
const _ = require("lodash");
class AdministratorsList extends Component {
  state = { admins: [], errors: {}, users: [] };
  async componentDidMount() {
    const state = this.state;
    const admins = await getAdmins(getToken());
    if (admins.error) state.errors = admins.error;
    else state.admins = admins.data;
    this.setState({ state });
  }
  handleRemoveAdmin = async ({ currentTarget: e }) => {
    let Confirm = window.confirm("Are you sure you want to remove this admin?");
    if (Confirm) {
      let id = e.id;
      let result = await removeAdmin(id, getToken());
      if (result.error) return alert(result.error.message);
      const state = this.state;
      _.remove(state.admins, s => s._id === id);
      this.setState({ state });
      alert("admin removed successfuly");
    }
  };
  render() {
    const { admins } = this.state;
    return (
      <React.Fragment>
        <div className="page-section bg-dark">
          <HeadTitle label=" Administrators" color="white" size="64px" />
          <div className="container mt-5">
            <div className="row justify-content-center mt-5">
              {admins && admins.length > 0 ? (
                admins.map(item => {
                  return (
                    <AdminItem
                      item={item}
                      key={item._id}
                      handleRemoveAdmin={this.handleRemoveAdmin}
                    />
                  );
                })
              ) : (
                <React.Fragment>
                  <h1 className="row text-white">
                    There are no admis except you right now.
                  </h1>
                </React.Fragment>
              )}
              <AddAdmin />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdministratorsList;
