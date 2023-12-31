import { Request } from "express";
import ServiceClient from "../../../shared/ServiceClient";

const getFacilities = async (params?: { [key: string]: any }) => {
  return await ServiceClient.callService("nishauri-facilities-registry-ms", {
    url: "facilities",
    method: "GET",
    params,
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
