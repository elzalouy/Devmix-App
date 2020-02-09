import http from "../httpService";
let route = process.env.REACT_APP_API + "attendees/";
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
export async function getUserAttendee(id, user_id) {
  const response = await http.get(
    route + "getUserAttendee/" + id + "/" + user_id
  );
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: response.data, error: null };
}
export async function getUserAttendees(id) {
  const response = await http.get(route + "getUserAttendees/" + id);
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: response.data, error: null };
}

export async function getAttendeesList(token) {
  const headers = {
    "Content-Type": "application/json",
    "x-auth-token": token
  };
  const response = await http.get(route + "AttendeesList", {
    headers: headers
  });
  const result = handleServerError(response);
  if (result) return { error: result, data: null };
  return { data: response.data, error: null };
}

export async function confirmAttendee(id, user, token) {
  const headers = {
    "Content-Type": "application/json",
    "x-auth-token": token
  };
  const response = await http.post(
    route + "confirm",
    { user: user, event: id },
    {
      headers: headers
    }
  );
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: response.data, error: null };
}

export async function deleteAttendees(ids, token) {
  const headers = {
    "Content-Type": "application/json",
    "x-auth-token": token
  };
  const response = await http.post(
    route + "delete",
    { ids: ids },
    { headers: headers }
  );
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: response.data, error: null };
}
