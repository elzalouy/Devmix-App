import http from "../httpService";
import { getToken, removeToken, setToken } from "../localStorage";
import { apiEndpoint } from "../../../src/config.json";
import jwtDecode from "jwt-decode";
const handleServerError = require("../handleServerErrors");
const route = apiEndpoint + "users/";

export async function getUserById(id) {
  const response = await http.get(route + "byid/" + id);
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: response.data, error: null };
}
export async function getUserByName(name) {
  const response = await http.get(route + "search/" + name);
  const result = handleServerError(response);
  if (result) return { error: result, data: null };
  return { error: null, data: response.data };
}
export async function addNewUser(user) {
  const response = await http.post(route, {
    name: user.name,
    email: user.email,
    password: user.password,
    gender: user.gender
  });
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  setToken(response.headers["x-auth-token"]);
  return { data: response.headers["x-auth-token"], error: null };
}
export function getUserByToken() {
  const token = getToken();
  if (token) {
    let user = jwtDecode(token);
    if (user && user.exp >= Date.now() / 1000) {
      return user;
    } else {
      removeToken();
    }
  }
  return null;
}
