import React, { Component } from "react";
import { owner } from "../../../httpServices/auth/auth";

class EditProfile extends Component {
  state = {};
  render() {
    const {
      id,
      label,
      inputClassName,
      value,
      type,
      inputName,
      changeValue,
      saveProfile,
      status,
      handleEdit,
      placeholder
    } = this.props;
    return (
      <React.Fragment>
        <div className="w-100">
          {owner(id) && (
            <React.Fragment>
              {status === inputName ? (
                <React.Fragment>
                  {type === "input" ? (
                    <input
                      name={inputName}
                      type="text"
                      className={inputClassName}
                      value={value}
                      onChange={changeValue}
                      placeholder={placeholder}
                    />
                  ) : (
                    <textarea
                      type="textarea"
                      rows="4"
                      name={inputName}
                      className={inputClassName}
                      value={value}
                      onChange={changeValue}
                      placeholder={placeholder}
                    />
                  )}
                  <i
                    className="fa fa-check bg-dark text-white p-2 m-1 cursor-p brd-100"
                    aria-hidden="true"
                    onClick={saveProfile}
                  ></i>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div>
                    {label}
                    <i
                      className="fa fa-plus brd-100 p-1 cursor-p h-100 f-12 bg-gray ml-2"
                      aria-hidden="true"
                      onClick={handleEdit}
                      id={inputName}
                    ></i>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default EditProfile;
