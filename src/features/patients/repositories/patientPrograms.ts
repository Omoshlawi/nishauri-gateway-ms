import ServiceClient from "../../../shared/ServiceClient";

const getPatientPrograms = async (userId: any) => {
  return await ServiceClient.callService("nishauri-patients-ms", {
    method: "GET",
    url: "programs",
  });
};

const registerForProgram = async (userId: string, data: any, token: string) => {
  return await ServiceClient.callService("nishauri-patients-ms", {
    method: "POST",
    url: `programs/patient-programs/${userId}`,
    data,
    headers: { "x-access-token": token },
  });
};
const requestVerification = async (userId: string, token: string) => {
  return await ServiceClient.callService("nishauri-patients-ms", {
    method: "GET",
    url: `programs/patient-programs/${userId}/verify`,
    headers: { "x-access-token": token },
  });
};
const verifyProgramRegistration = async (
  userId: any,
  data: any,
  token: string
) => {
  return await ServiceClient.callService("nishauri-patients-ms", {
    method: "POST",
    url: `programs/patient-programs/${userId}/verify`,
    headers: { "x-access-token": token },
    data,
  });
};

export default {
  getPatientPrograms,
  registerForProgram,
  verifyProgramRegistration,
  requestVerification,
};
