const { authed, admin } = require("../httpServices/auth/auth");
export default function(handler) {
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
}
