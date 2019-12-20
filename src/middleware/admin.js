const { authed, admin } = require("../httpServices/auth/auth");
module.exports = function(handler) {
  return async e => {
    if (authed()) {
      if (admin()) {
        await handler(e);
      } else {
        return window.location("/");
      }
    } else {
      return (window.location = "/login");
    }
  };
};
