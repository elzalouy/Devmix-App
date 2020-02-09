import http from "../httpService";
const route = process.env.REACT_APP_API + "mail/";
const handleServerError = require("../handleServerErrors");

export async function sendMail(mail, token) {
  const headers = {
    "Content-Type": "application/json",
    "x-auth-token": token
  };
  const response = await http.post(route, { mail: mail }, { headers: headers });
  const result = handleServerError(response);
  if (result) return { error: result, data: null };
  else return { error: null, data: response.data };
}

export async function sendMailList(ids, mail, token) {
  const headers = {
    "Content-Type": "application/json",
    "x-auth-token": token
  };
  console.log({ ids: ids, html: mail });
  const response = await http.post(
    route + "list",
    { mail: { ids: ids, html: mail } },
    { headers: headers }
  );
  const result = handleServerError(response);
  if (result) return { error: result, data: null };
  else return { error: null, data: response.data };
}
