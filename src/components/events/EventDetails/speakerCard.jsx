import React, { Component } from "react";
import { getUserById } from "../../../httpServices/user/user";
class SpeakerCard extends Component {
  state = {
    speaker: {}
  };
  async componentDidMount() {
    let result = await getUserById(this.props.item.instructor_id);
    if (result.error) return 0;
    let speaker = result.data;
    const state = this.state;
    state.speaker = speaker;
    this.setState({ state });
  }
  render() {
    const { speaker } = this.state;
    return (
      <React.Fragment>
        {speaker && (
          <div className="col-md-3 brd-2 bg-white p-0 pb-2 m-4 speaker">
            <div className="row">
              <div className="col-sm-12 speaker_cover">
                <img
                  src={
                    speaker && speaker.profile_photo
                      ? speaker.profile_photo
                      : ""
                  }
                  alt=""
                  className="w-100 h-100"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="col pl-5">
                <h3 className="pt-2 m-0">{speaker.name}</h3>
                <h6 className="text-gray">{speaker.job ? speaker.job : ""}</h6>
                <a
                  href={speaker.linkedin ? speaker.linkedin : ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pr-3 text-dark"
                >
                  <i className="fab fa-linkedin-in" aria-hidden="true"></i>
                </a>
                <a
                  href={speaker.github ? speaker.github : ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pr-3 text-dark"
                >
                  <i className="fab fa-github-alt" aria-hidden="true"></i>
                </a>
                <a
                  href={speaker.twitter ? speaker.twitter : ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pr-3 text-dark"
                >
                  <i className="fab fa-wa fa-twitter" aria-hidden="true"></i>
                </a>
                <a
                  href={speaker.facebook ? speaker.facebook : ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pr-3 text-dark"
                >
                  <i className="fab fa-wa fa-facebook-f"></i>
                </a>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default SpeakerCard;
