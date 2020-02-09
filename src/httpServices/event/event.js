import http from "../httpService";
let route = process.env.REACT_APP_API + "event/";
const handleServerError = require("../handleServerErrors");

export async function getALlEvents() {
  return http.get(route);
}

export async function getEventById(id) {
  const response = await http.get(route + "get/" + id);
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: response.data, error: null };
}

export async function saveEvent(event, token) {
  const headers = {
    "Content-Type": "application/json",
    "x-auth-token": token
  };
  const response = await http.post(
    route,
    {
      name: event.name,
      location: event.location,
      date: event.date,
      cover_photo: event.cover_photo,
      sessions: event.sessions,
      facebook_link: event.facebook_link,
      twitter_link: event.twitter_link
    },
    { headers: headers }
  );
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: response.data, error: null };
}

export async function saveEventImage(image, id, token) {
  const headers = {
    "Content-Type": "multipart/form-data",
    "x-auth-token": token
  };
  const data = new FormData();
  data.append("cover_photo", image);
  data.append("id", id);
  const response = await http.post(route + "image", data, {
    headers: headers
  });
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: response.data, error: null };
}

export async function updateEvent(id, event, token) {
  const headers = {
    "Content-Type": "application/json",
    "x-auth-token": token
  };
  let newroute = route + "update/";
  const response = await http.put(newroute + id, event, {
    headers: headers
  });
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: response.data, error: null };
}

export async function deleteEvent(id, token) {
  const headers = {
    "Content-Type": "application/json",
    "x-auth-token": token
  };
  const response = await http.delete(route + id, { headers: headers });
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: null, error: null };
}

export async function deleteSession(id, session_id, token) {
  const headers = {
    "Content-Type": "application/json",
    "x-auth-token": token
  };
  const response = await http.delete(
    route + "sessions/" + id + "/" + session_id,
    { headers: headers }
  );
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: response.data, error: null };
}
export async function giveFeedback(feedback, token) {
  let headers = {};
  if (token)
    headers = { "Content-Type": "application/json", "x-auth-token": token };
  const response = await http.post(route + "feedback/", feedback, {
    headers: headers
  });
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: response.data, error: null };
}
