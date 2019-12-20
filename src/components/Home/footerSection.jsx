import React from "react";

const FooterSection = () => {
  return (
    <React.Fragment>
      <div className="page-section bg-black text-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-lg-0">
              <h4 className="text-uppercase mb-4 text-white fw-b">location</h4>
              <p className=" fw-n f-18 text-gray mb-5">
                {"Mansoura University"} <br />
                {"Dakahlya, Egypt"}
              </p>
            </div>
            <div className="col-lg-4 mb-lg-0">
              <h4 className="text-uppercase mb-4 text-white fw-b">
                around the web
              </h4>
              <a
                href="https://www.facebook.com/DevmixOfficialPage/"
                className="btn btn-outline-light facebook-button mx-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-wa fa-facebook-f"></i>
              </a>
              <a
                href="https://twitter.com/DevMixTeam"
                className="btn btn-outline-light twitter-button mx-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-wa fa-twitter" aria-hidden="true"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/devmix/detail/treasury/position:636506671/?entityUrn=urn%3Ali%3Afs_treasuryMedia%3A(ACoAABf_tTcBzy6bOgrn3n2V2Blt10Hibk8goeg%2C1557340424699)&section=position%3A636506671&treasuryCount=1"
                className="btn btn-outline-light linkedin-button mx-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin-in" aria-hidden="true"></i>
              </a>

              <a
                href="https://github.com/dev-mix"
                className="btn btn-outline-light linkedin-button mx-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github-alt" aria-hidden="true"></i>
              </a>
            </div>
            <div className="col-lg-4 mb-lg-0">
              <h4 className="text-uppercase mb-4 text-white fw-b">
                about devmix
              </h4>
              <p className=" fw-n f-18 text-gray mb-4">
                Devmix team is an NGO that aims to help people who want to learn
                IT fields.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 text-center text-white bg-bottomDark">
        <div className="container">
          <small>Copyright © Devmix 2019</small>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FooterSection;
