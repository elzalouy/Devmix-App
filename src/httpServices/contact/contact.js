import http from "../httpService";
const route = process.env.REACT_APP_API + "contact/";
const handleServerError = require("../handleServerErrors");

export async function getAllContacts(token) {
  const headers = {
    "Content-Type": "application/json",
    "x-auth-token": token
  };
  const response = await http.get(route + "all", { headers: headers });
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: response.data, error: result };
}

export async function addNewContact(contact) {
  const response = await http.post(route + "request", {
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    message: contact.message
  });
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: null, error: null };
}

export async function deleteContact(token, id) {
  const headers = {
    "Content-Type": "application/json",
    "x-auth-token": token
  };
  const response = await http.delete(route + id, { headers: headers });
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: response.data, error: null };
}
