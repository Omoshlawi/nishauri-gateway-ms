import ServiceClient from "../../../../shared/ServiceClient";

const loginUser = async (data: any) => {
  /**
   * get persons with email or phone number equals provided username
   * Gets user with username or id in user ids
   * Check all user against provided password
   * @return {}user whos creds matched
   * else return undefined
   */
  const loginResponse = await ServiceClient.callService("nishauri-users-ms", {
    url: "auth/login",
    data: data,
    method: "POST",
  });
  return loginResponse;
};

const registerUser = async (data: any) => {
  /**
   * Check if no user has the username,
   * checks if no person has email r
   * checks if no person has phone number
   * creates user
   * creates person
   * return user
   * else return underfinied
   */
  const resgisterResponse = await ServiceClient.callService(
    "nishauri-users-ms",
    {
      url: "auth/register",
      data: data,
      method: "POST",
    }
  );
  return resgisterResponse;
};

const verifyUserAccount = async (token: string, data: any) => {
  const verificationResponse = await ServiceClient.callService(
    "nishauri-users-ms",
    {
      url: "auth/verify",
      data: data,
      method: "POST",
      headers: { "x-access-token": token },
    }
  );
  return verificationResponse;
};

const getOrCreateAccountVerification = async (token: string, mode: any) => {
  const verification = await ServiceClient.callService("nishauri-users-ms", {
    url: "auth/verify",
    method: "GET",
    headers: { "x-access-token": token },
    params: { mode },
  });
  return verification;
};

const refreshToken = async (token: string) => {
  return await ServiceClient.callService("nishauri-users-ms", {
    url: "auth/refresh-token",
    method: "GET",
    headers: { "x-refresh-token": token },
  });
};

export default {
  registerUser,
  loginUser,
  verifyUserAccount,
  getOrCreateAccountVerification,
  refreshToken,
};
