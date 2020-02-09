import http from "../httpService";
const handleServerError = require("../handleServerErrors");
const route = process.env.REACT_APP_API + "join/";

export async function getAllJoinRequests(token) {
  const headers = {
    "Content-Type": "application/json",
    "x-auth-token": token
  };
  const response = await http.get(route + "list", { headers: headers });
  const result = handleServerError(response);
  if (result) return { data: null, error: response };
  return { data: response.data, error: null };
}

export async function addJoinRequest(request) {
  const response = await http.post(route + "request", {
    fullName: request.fullName,
    email: request.email,
    school: request.school,
    experience: request.experience,
    career: request.career,
    fields: request.fields,
    languages: request.languages,
    linkedin: request.linkedin,
    freelanceSite: request.freelanceSite,
    OrganizationField: request.OrganizationField,
    fieldExperience: request.fieldExperience
  });
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: null, error: null };
}

export async function deleteJoinRequest(id, token) {
  const headers = {
    "Content-Type": "application/json",
    "x-auth-token": token
  };
  const response = await http.delete(route + "delete/" + id, {
    headers: headers
  });
  const result = handleServerError(response);
  if (result) return { data: null, error: result };
  return { data: response.data, error: null };
}
