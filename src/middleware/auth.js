const { authed } = require("../httpServices/auth/auth");

export default function(handler) {
  return async e => {
    if (authed()) {
      return await handler(e);
    } else {
      window.location = "/login";
    }
  };
}
