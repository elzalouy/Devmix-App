import http from "../httpService";
import { apiEndpoint } from "../../../src/config.json";
const handleServerError = require("../handleServerErrors");
const route = apiEndpoint + "join/";

export async function getAllJoinRequests() {}
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
