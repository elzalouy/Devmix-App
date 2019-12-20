import React, { Component } from "react";
import { getTime } from "../../../utils/formatDate";
import { getUserById } from "../../../httpServices/user/user";

class TimelineCard extends Component {
  state = { speaker: {}, session: {} };
  async componentDidMount() {
    const state = this.state;
    const session = this.props.session;
    state.session = session;
    const result = await getUserById(session.instructor_id);
    if (result.error) return 0;
    state.speaker = result.data;
    this.setState({ state });
  }
  render() {
    if (this.state.session && this.state.speaker) {
      const { session, speaker } = this.state;
      const { hour, minutes } = getTime(session.time);
      return (
        <React.Fragment>
          <div className="col">
            <div className="p-4 text-left" key="0">
              <h5 className="text-white">{session.session_name}</h5>
              <p className="text-dark">
                <i className="fas fa-clock"></i>
                {hour}:{minutes}
                &nbsp; <i className="text-gray">by</i>
              </p>
              <p className="text-dark">
                <img
                  src={speaker.profile_photo}
                  alt=""
                  className="brd-100 width-15 height-15 pr-2"
                />
                {speaker.name}
              </p>
              <hr className="bg-gray" />
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  }
}

export default TimelineCard;
