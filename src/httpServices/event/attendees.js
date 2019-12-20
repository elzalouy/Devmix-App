import http from "../httpService";
import { apiEndpoint } from "../../config.json";
let route = apiEndpoint + "attendees/";
const handleServerError = require("../handleServerErrors");

export async function attendEvent(id, token) {
  const headers = {
    "Content-Type": "application/json",
    "x-auth-token": token
  };
  const response = await http.get(route + "attendEvent/" + id, {
    headers: headers
  });
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: response.data, error: null };
}
export async function notAttendEvent(id, token) {
  const headers = {
    "Content-Type": "application/json",
    "x-auth-token": token
  };
  const response = await http.get(route + "notAttend/" + id, {
    headers: headers
  });
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: response.data, error: null };
}
export async function getUserAttendee(id, token) {
  const headers = {
    "Content-Type": "application/json",
    "x-auth-token": token
  };
  const response = await http.get(route + "getUserAttendee/" + id, {
    headers: headers
  });
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: response.data, error: null };
}
