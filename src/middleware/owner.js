const { owner } = require("../httpServices/auth/auth");

export default function(id, handler) {
  return async e => {
    if (owner(id)) {
      return await handler(e);
    } else {
      window.location = "/login";
    }
  };
}
