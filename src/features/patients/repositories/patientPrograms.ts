import ServiceClient from "../../../shared/ServiceClient";

const getPatientPrograms = async (patientId: any) => {
  return await ServiceClient.callService("nishauri-patients-ms", {
    method: "GET",
    url: "programs",
  });
};

const registerForProgram = async (userId: string, data: any) => {
  return await ServiceClient.callService("nishauri-patients-ms", {
    method: "POST",
    url: `programs/patient-programs/${userId}23`,
    data,
  });
};
const verifyProgramRegistration = async (patientId: any) => {
  return await ServiceClient.callService("nishauri-patients-ms", {
    method: "GET",
    url: "programs",
  });
};

export default {
  getPatientPrograms,
  registerForProgram,
  verifyProgramRegistration,
};
