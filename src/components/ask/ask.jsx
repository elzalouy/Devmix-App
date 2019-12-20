import React, { Component } from "react";
import AskForm from "./askForm";
import AskList from "./askList";
import "./ask.css";
class Ask extends Component {
  render() {
    return (
      <React.Fragment>
        <AskForm />
        <AskList />
      </React.Fragment>
    );
  }
}

export default Ask;
