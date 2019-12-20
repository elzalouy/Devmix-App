import http from "../httpService";
import { apiEndpoint } from "../../../src/config.json";
const handleServerError = require("../handleServerErrors");
const route = apiEndpoint + "ask/";

export async function saveAsk(ask) {
  const response = await http.post(route, ask);
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: response.data, error: null };
}
export async function getAsks(from, to) {
  const response = await http.get(route + `/${from}/${to}`);
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
