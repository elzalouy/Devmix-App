import http from "../httpService";
import jwtDecode from "jwt-decode";
import { setToken, removeToken, getToken } from "../localStorage";
const handleServerError = require("../handleServerErrors");
const route = process.env.REACT_APP_API + "auth/";

export async function login(email, password) {
  const response = await http.post(route, {
    email: email,
    password: password
  });
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  else {
    setToken(response.data.token);
    return { data: response.data.token, error: null };
  }
}

export function owner(id) {
  let token = getToken();
  if (token) {
    let user = jwtDecode(token);
    if (user && user._id === id) return true;
  }
  return false;
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
