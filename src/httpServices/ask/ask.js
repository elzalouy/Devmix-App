import http from "../httpService";
const handleServerError = require("../handleServerErrors");
const route = process.env.REACT_APP_API + "ask/";

export async function saveAsk(ask) {
  const response = await http.post(route, ask);
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: response.data, error: null };
}

export async function getAsks() {
  const response = await http.get(route);
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: response.data, error: null };
}

export async function getNotAnswered(token) {
  const headers = { "Content-Type": "application/json", "x-auth-token": token };
  const response = await http.get(route + `notAnswered`, {
    headers: headers
  });
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: response.data, error: null };
}

export async function AnswerQuestion(id, question, token) {
  const headers = { "Content-Type": "application/json", "x-auth-token": token };
  const response = await http.post(route + "admin/answering/" + id, question, {
    headers: headers
  });
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: response, error: null };
}

export async function getAsksCount() {
  const response = await http.get(route + "count");
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: response.data, error: null };
}

export async function deleteQuestion(id, token) {
  const headers = { "Content-Type": "application/json", "x-auth-token": token };
  const response = await http.delete(route + "admin/deleteQuestion/" + id, {
    headers: headers
  });
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: response.data, error: null };
}
export async function userDeleteAsk(id, token) {
  const headers = { "Content-Type": "application/json", "x-auth-token": token };
  const response = await http.delete(route + "user/deleteQuestion/" + id, {
    headers: headers
  });
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: response.data, error: null };
}
export async function getUserAsks(id) {
  const response = await http.get(route + "UserAsks/" + id);
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: response.data, error: null };
}
