import React, { Component } from "react";
import { getAsksCount } from "../../httpServices/ask/ask";
class Stats extends Component {
  state = {
    KnownasksCount: 0,
    unknowAsksCount: 0
  };
  async componentDidMount() {
    const state = this.state;
    const count = await getAsksCount();
    if (count.error) state.errors = count.error;
    else {
      state.unknowAsksCount = count.data ? count.data.unknownCount : 0;
      state.KnownasksCount = count.data ? count.data.knownCount : 0;
    }
    this.setState({ state });
  }
  render() {
    const { KnownasksCount, unknowAsksCount } = this.state;
    return (
      <div className="col-md-4">
        <div className="bg-white brd-2 py-2 justify-content-center container text-left shadow">
          <h5 className="text-dark fw-b pt-1">Stats</h5>
          <hr className="pt-1" />
          <div className="custom-control-inline w-100 bg-gray pl-2 mb-2 py-2">
            <i className="fa fa-question bg-dark p-2" aria-hidden="true"></i>
            <p className="p-0 m-0 pt-1 ml-2 fw-b">
              Unknown Questions ( {unknowAsksCount} )
            </p>
          </div>
          <div className="custom-control-inline w-100 bg-gray pl-2 mb-2 py-2">
            <i className="fas fa-user bg-dark p-2   "></i>
            <p className="p-0 m-0 pt-1 ml-2 fw-b">
              known Questions ( {KnownasksCount} )
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Stats;
