import http from "../httpService";
import { apiEndpoint } from "../../config.json";
const route = apiEndpoint + "contact/";
const handleServerError = require("../handleServerErrors");
export function getAllContacts() {}

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
