import React, { Component } from "react";
import { owner } from "../../../httpServices/auth/auth";
import { uploadProfilePhoto } from "../../../httpServices/user/user";
import { getToken } from "../../../httpServices/localStorage";
class UploadImage extends Component {
  upload = React.createRef();
  state = { id: null, image: null };
  componentDidMount() {
    const id = this.props.id;
    const state = this.state;
    state.id = id;
    this.setState({ state });
  }
  handleChangeImage = ({ currentTarget: e }) => {
    const state = this.state;
    state.image = e.files[0];
    this.setState({ state });
  };
  handleSaveImage = async e => {
    e.preventDefault();
    const state = this.state;
    await uploadProfilePhoto(state.image, getToken());
    window.location.reload();
  };

  render() {
    if (!owner(this.state.id)) return null;
    return (
      <React.Fragment>
        <input
          id="profile_photo"
          onChange={this.handleChangeImage}
          type="file"
          ref={ref => (this.upload = ref)}
          style={{ display: "none" }}
        />
        {!this.state.image ? (
          <button
            className="btn change_photo bg-dark text-white brd-100"
            onClick={e => this.upload.click()}
          >
            <i className="fa fa-camera" aria-hidden="true"></i>
          </button>
        ) : (
          <React.Fragment>
            <button
              className="btn change_photo bg-dark text-white brd-100"
              onClick={this.handleSaveImage}
            >
              <i className="fa fa-check" aria-hidden="true"></i>
            </button>
            <button
              className="btn btn-danger change_photo px-3 text-white brd-100"
              onClick={e => window.location.reload()}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default UploadImage;
