import ServiceClient from "../../../../shared/ServiceClient";

const getUserProfileByToken = async (token: string) => {
  return await ServiceClient.callService("nishauri-users-ms", {
    url: "auth/profile",
    method: "GET",
    headers: { "x-access-token": token },
  });
};

const updateUserProfile = async (userId: string, data: any) => {
  const {
    // allergies,
    // chronics,
    // disabilities,
    email,
    phoneNumber,
    username,
    ...others
  } = data;

  /**
   * Check if no user has the username,
   * checks if no person has email r
   * checks if no person has phone number
   * update user
   * update person
   * Update user profile updated flag to true
   */
};

const getPersonByUserId = async (userId: string) => {};

const changeUserPassword = async (token: string, data: any) => {};

export default {
  getUserProfileByToken,
  updateUserProfile,
  getPersonByUserId,
  changeUserPassword,
};
