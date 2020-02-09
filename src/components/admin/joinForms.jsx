import React, { Component } from "react";
import HeadTitle from "../common/headTitle/headTitle";
import JoinForm from "./joinFormItem";
import { getAllJoinRequests } from "../../httpServices/join/joinForm";
import { getToken } from "../../httpServices/localStorage";
import { paginate } from "../../utils/paginate";
import Pagination from "../../components/common/pagination/pagination";
import { deleteJoinRequest } from "../../httpServices/join/joinForm";
const _ = require("lodash");
class JoinForms extends Component {
  state = {
    errors: {},
    joinForms: [],
    currentPage: 1,
    pageSize: 2
  };

  async componentDidMount() {
    const state = this.state;
    const result = await getAllJoinRequests(getToken());
    if (result.error) state.errors = result.error;
    else state.joinForms = result.data;
    this.setState({ state });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page, contact_item: null });
  };

  getPagedData = () => {
    const { pageSize, currentPage, joinForms } = this.state;
    let filtered = joinForms;
    filtered = paginate(joinForms, currentPage, pageSize);
    return { totalCount: joinForms ? joinForms.length : 0, data: filtered };
  };
  hanleDeleteForm = async ({ currentTarget: e }) => {
    let confirm = window.confirm("Are you sure, you wnat to delete this form?");
    if (confirm) {
      const state = this.state;
      const result = await deleteJoinRequest(e.id, getToken());
      if (result.error) alert(result.error.message);
      else {
        _.remove(state.joinForms, s => s._id === e.id);
        this.setState({ state });
      }
    }
  };

  render() {
    const { pageSize, currentPage } = this.state;
    const { totalCount, data: joinForms } = this.getPagedData();
    return (
      <React.Fragment>
        <div className="page-section bg-dark">
          <HeadTitle label="join forms" color="white" size="64px" />
          <div className="container mt-5">
            <div className="row justify-content-center mt-5">
              {joinForms &&
                joinForms.length > 0 &&
                joinForms.map(item => {
                  return (
                    <JoinForm
                      hanleDeleteForm={this.hanleDeleteForm}
                      key={item._id}
                      item={item}
                    />
                  );
                })}
            </div>
            <div className="row p-0 m-0 justify-content-center text-center w-100">
              <Pagination
                onPageChange={this.handlePageChange}
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default JoinForms;
