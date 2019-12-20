import React, { Component } from "react";
import HeadTitle from "../common/headTitle/headTitle";
import workshopImg from "../../assets/workshop.svg";
import { getAllWorkshops } from "../../httpServices/workshops/workshops";
import "../workshops/workshops.css";
const handle = require("../../middleware/errorHandle");
class WorkShops extends Component {
  state = { filter: "", workshops: [], filtered: [] };
  componentDidMount() {
    const state = this.state;
    state.workshops = getAllWorkshops();
    state.filtered = state.workshops;
    this.setState({ state });
  }
  filtering = handle(label => {
    const state = this.state;
    state.filter = label;
    let now = new Date();
    if (label === "upcoming") {
      state.filtered = [
        this.state.workshops.find(item => {
          let date = new Date(item.start);
          if (date > now) return item;
          else return null;
        })
      ];
    } else if (label === "finished") {
      state.filtered = [
        this.state.workshops.find(item => {
          let date = new Date(item.end);
          if (date < now) return item;
          else return null;
        })
      ];
    } else {
      state.filtered = this.state.workshops;
    }
    this.setState({ state });
  });
  render() {
    const { filtered: workshops } = this.state;
    return (
      <React.Fragment>
        <div className="page-section bg-dark text-white text-center">
          <div className="container-d-flex align-items-center flex-column">
            <img
              src={workshopImg}
              alt=""
              className="mb-5"
              style={{ height: "255px", width: "240px" }}
            />
            <HeadTitle label="Workshops" color="white" size="54px" />
            <p className="f-24 font-weight-light mb-0">
              Time to acquire <mark>Experience</mark>
            </p>
          </div>
        </div>
        <div className="page-section m-0 bg-white">
          <div className="row justify-content-center m-0 text-center">
            <p
              className={
                this.state.filter === "all"
                  ? "p-2 text-dark checked-label label"
                  : "p-2 text-gray label"
              }
              onClick={() => this.filtering("all")}
            >
              All
            </p>
            <p
              className={
                this.state.filter === "finished"
                  ? "p-2 text-dark checked-label label"
                  : "p-2 text-gray label"
              }
              onClick={() => this.filtering("finished")}
            >
              Finished
            </p>
            <p
              className={
                this.state.filter === "upcoming"
                  ? "p-2 text-dark checked-label label"
                  : "p-2 text-gray label"
              }
              onClick={() => this.filtering("upcoming")}
            >
              Upcoming
            </p>
          </div>
          <div className="container">
            <div className="row justify-content-center align-items-center">
              {workshops.map(item => {
                return (
                  <div
                    className="col-sm-3 p-0 m-2 bg-gray brd-3 white_shadow item"
                    key={item._id}
                  >
                    <img
                      src={item.workshop_cover}
                      className="w-100 cover cursor-p"
                      alt=""
                    />
                    <div className="pl-2 py-2">
                      <h4>{item.name}</h4>
                      <p className="p-0 text-gray fw-12 m-0">
                        <i className="fas fa-map-marked-alt pr-1"></i> &nbsp;
                        {item.location}
                      </p>
                      <p className="p-0 text-gray fw-12 m-0">
                        <i className="fas fa-clock   pr-1"></i> &nbsp;{" "}
                        {item.start}
                      </p>
                      <p className="f-14">{item.short_description}</p>
                      <div className="row align-items-center text-center px-4">
                        <div className="option">
                          <p>
                            <span>128</span>
                            <br />
                            <i className="fas fa-walking text-crimsom cursor-p f-24 px-2 hover_f2"></i>
                          </p>
                        </div>
                        <div className="option">
                          <p>
                            <span>100</span>
                            <br />
                            <i className="fas fa-heart text-crimsom cursor-p f-24 px-2 hover_f2"></i>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default WorkShops;
