import { Request } from "express";
import ServiceClient from "../../../shared/ServiceClient";

const getFacilities = async () => {
  return await ServiceClient.callService("nishauri-facilities-registry-ms", {
    url: "facilities",
    method: "GET",
  });
};

const registerFacility = async (data: FormData, token: string) => {
  return await ServiceClient.callService("nishauri-facilities-registry-ms", {
    url: "facilities",
    method: "POST",
    headers: { "x-access-token": token },
    data,
  });
};

export default {
  registerFacility,
  getFacilities,
};
