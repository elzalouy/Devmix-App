import { Component } from "react";
import { authed } from "../../httpServices/auth/auth";
import { setToken, removeToken } from "../../httpServices/localStorage";
class EmailConfirm extends Component {
  componentDidMount() {
    const token = this.props.match.params.token;
    if (token) {
      setToken(token);
      if (!authed()) removeToken();
    }
    window.location = "/";
  }
  render() {
    return 0;
  }
}

export default EmailConfirm;
