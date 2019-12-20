import React, { Component } from "react";
import "./alert.css";

class Alert extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="alert">
          <span
            class="closebtn"
            onclick="this.parentElement.style.display='none';"
          >
            &times;
          </span>
          {this.props.message}
        </div>
      </React.Fragment>
    );
  }
}

export default Alert;
