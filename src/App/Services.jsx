import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { getUserByToken } from "../httpServices/user/user";
import { authed, admin } from "../httpServices/auth/auth";
// import WorkShops from "../components/workshops/workshops";
import Ask from "../components/ask/ask";
import Events from "../components/events/events";
import Register from "../components/user/register";
import Login from "../components/user/login";
import Logout from "../components/user/logout";
import Home from "../components/Home/Home.jsx";
import EventDetails from "../components/events/EventDetails/eventDetails";
import JoinUs from "../components/JoinUs/joinUs";
import NotFound from "../components/common/NotFound/NotFound";
import AddEvent from "../components/events/newEvent";
const _ = require("lodash");
class Services extends Component {
  state = {
    navBarItems: [
      {
        label: "EVENTS",
        link: "/events",
        active: false
      },
      // {
      //   label: "WORKSHOPS",
      //   link: "/workshops",
      //   active: false
      // },
      { label: "ASK", link: "/ask", active: false },

      {
        label: "LOGIN",
        link: "/login",
        active: false
      },
      {
        label: "REGISTER",
        link: "/register",
        active: false
      }
    ],
    Routes: [
      {
        route: "/events",
        Route: <Route path="/events" key="events" component={Events} />
      },
      // {
      //   route: "/workshops",
      //   Route: <Route path="/workshops" key="workshops" component={WorkShops} />
      // },
      {
        route: "/ask",
        Route: <Route path="/ask" key="ask" component={Ask} />
      },
      {
        route: "/event/:id",
        Route: <Route path="/event/:id" key="event" component={EventDetails} />
      },
      {
        route: "/newEvent",
        Route: (
          <Route
            path="/newEvent"
            key="newEvent"
            render={props => {
              if (admin()) return <AddEvent {...props} />;
              return <Redirect to="/" />;
            }}
          />
        )
      },
      {
        route: "/login",
        Route: (
          <Route
            path="/login"
            key="login"
            render={props => {
              if (authed()) return <Redirect to="/home" />;
              return <Login {...props} />;
            }}
          />
        )
      },
      {
        route: "/register",
        Route: (
          <Route
            path="/register"
            key="register"
            render={props => {
              if (authed()) return <Redirect to="/home" />;
              return <Register {...props} />;
            }}
          />
        )
      },
      {
        route: "/logout",
        Route: <Route path="/logout" component={Logout} key="logout" />
      },
      {
        route: "/Not-Found",
        Route: <Route path="/Not-Found" component={NotFound} key="notfound" />
      },

      {
        route: "/join",
        Route: <Route path="/join" component={JoinUs} key="join" />
      },
      {
        route: "/home",
        Route: <Route path="/home" component={Home} key="home" />
      },
      {
        route: "/",
        Route: <Redirect from="/" to="/home" exact key="/" />
      },
      {
        Route: <Redirect to="/Not-Found" key="not-found" />
      }
    ]
  };

  componentDidMount() {
    const state = this.state;
    if (authed()) {
      state.user = getUserByToken();
      state.navBarItems = _.filter(state.navBarItems, item => {
        return item.link !== "/login" && item.link !== "/register";
      });
    }
    this.setState({ state });
  }
}

export default Services;
