import ServiceClient from "../../../shared/ServiceClient";

const getPrograms = async () => {
  return await ServiceClient.callService("nishauri-patients-ms", {
    method: "GET",
    url: "programs",
  });
};

const addProgram = async (data: any, token: string) => {
  return await ServiceClient.callService("nishauri-patients-ms", {
    method: "POST",
    url: "programs",
    data,
  });
};

const updateProgram = async (programId: string, data: any, token: string) => {
  return await ServiceClient.callService("nishauri-patients-ms", {
    method: "PUT",
    url: `programs/${programId}`,
    data,
  });
};

const deleteProgram = async (programId: string, token: string) => {
  return await ServiceClient.callService("nishauri-patients-ms", {
    method: "DELETE",
    url: `programs/${programId}`,
  });
};

export default {
  getPrograms,
  addProgram,
  updateProgram,
  deleteProgram,
};
