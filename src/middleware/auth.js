const { authed } = require("../httpServices/auth/auth");

module.exports = function(handler) {
  return async e => {
    if (authed()) {
      return await handler(e);
    } else {
      window.location = "/login";
    }
  };
};
