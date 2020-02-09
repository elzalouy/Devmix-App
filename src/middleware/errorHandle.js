export default function(handler) {
  return async e => {
    try {
      await handler(e);
    } catch (ex) {
      console.log(ex);
    }
  };
}
