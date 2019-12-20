import React, { Component } from "react";
import { getUserById } from "../../httpServices/user/user";
class Profile extends Component {
  state = { user: { data: {} } };
  componentDidMount() {
    try {
      const state = this.state;
      const id = this.props.match.params.id;
      const user = getUserById(id);
      state.user.data = user;
      this.setState({ state });
    } catch (ex) {
      alert(ex);
    }
  }
  render() {
    return <div><h1></h1></div>;
  }
}

export default Profile;
