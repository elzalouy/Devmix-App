import http from "../httpService";
import jwtDecode from "jwt-decode";
import { setToken, removeToken, getToken } from "../localStorage";
import { apiEndpoint } from "../../config.json";
const handleServerError = require("../handleServerErrors");
const route = apiEndpoint + "auth/";

export async function login(email, password) {
  const response = await http.post(route, {
    email: email,
    password: password
  });
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  setToken(response.data.token);
  return { data: response.data.token, error: null };
}
export function logout() {
  removeToken();
}
export function authed() {
  let token = getToken();
  if (token) {
    let user = jwtDecode(token);
    if (user) {
      return true;
    }
  }
  return false;
}
export function admin() {
  let token = getToken();
  if (token) {
    let user = jwtDecode(token);
    if (user && user.isAdmin) {
      return true;
    }
  }
  return false;
}
