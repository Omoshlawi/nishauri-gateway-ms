
const getUserProfileById = async (id: string ) => {
  
};

const updateUserProfile = async (
  userId: string,
  data: any
) => {
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

const getPersonByUserId = async (userId: string) => {
};

const changeUserPassword = async (
  token: string,
  data:any
) => {
  
};


export default {
  getUserProfileById,
  updateUserProfile,
  getPersonByUserId,
  changeUserPassword,

};
