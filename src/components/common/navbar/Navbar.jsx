import React, { Component } from "react";
import "../navbar/navbar.css";
import { Link } from "react-router-dom";
import { authed } from "../../../httpServices/auth/auth";
import { getUserByToken } from "../../../httpServices/user/user";
class NavBar extends Component {
  state = {
    items: [],
    active: ""
  };
  componentDidMount() {
    if (authed()) {
      const state = this.state;
      state.items = this.props.items;
      const user = getUserByToken();
      state.user = user;
      this.setState({ state });
    }
  }
  handleClick = label => {
    let active = this.state;
    active = label;
    this.setState({ active });
  };
  render() {
    const { items, logout } = this.props;
    const { user } = this.state;
    return (
      <React.Fragment>
        <ul className="nav navbar-expand-lg" id="nav">
          <a href="/" className="navbar-brand">
            Devmix
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggler"
            aria-controls="navbarToggler"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            MENU <i className="fas fa-bars"></i>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarToggler"
          >
            {items.map(item => {
              return (
                <li key={item.label} className="nav-item">
                  <Link
                    className={
                      window.location.pathname === item.link
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={item.link}
                    onClick={() => this.handleClick(item.label)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            {authed() && this.state.user && (
              <li className="nav-item" key="logout">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  to=""
                  id="navbardrop"
                  data-toggle="dropdown"
                >
                  {user.name.toUpperCase()} {user.isAdmin && "(Admin)"}
                </Link>
                <div className="dropdown-menu">
                  {/* <a
                    href={`/profile/${user._id}`}
                    className="dropdown-item cursor-p"
                  >
                    <i className="fa fa-sign-out pull-right"></i>
                    <i className="fa fa-user" aria-hidden="true"></i>&nbsp;
                    PROFILE
                  </a> */}
                  <a
                    href="/logout"
                    className="dropdown-item cursor-p"
                    onClick={logout}
                  >
                    <i className="fas fa-sign-out-alt"></i> &nbsp; LOGOUT
                  </a>
                </div>
              </li>
            )}
          </div>
        </ul>
      </React.Fragment>
    );
  }
}
export default NavBar;
