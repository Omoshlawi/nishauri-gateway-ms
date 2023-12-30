import ServiceClient from "../../../shared/ServiceClient";

const getFacilityLevels = async () => {
  return await ServiceClient.callService("nishauri-facilities-registry-ms", {
    url: "facilities/levels",
    method: "GET",
  });
};

const registerFacility = async (data: any, token: string) => {
  return await ServiceClient.callService("nishauri-facilities-registry-ms", {
    url: "facilities/levels",
    method: "POST",
    headers: { "x-access-token": token },
    data,
  });
};

export default {
  registerFacility,
  getFacilityLevels,
};
