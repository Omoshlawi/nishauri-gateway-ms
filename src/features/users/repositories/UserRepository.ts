import { isEmpty } from "lodash";
import ServiceClient from "../../../shared/ServiceClient";
import { Account, User } from "../entities";

/**
 * Common Interfacefor ineracting with datasource to manage user, authenticate and authorize
 */

class UserRepository {
  /**
   * creates user if no other user with unique fields like phoneNumber, email or username dont exist
   * @param entity User information sed to create new user
   * @returns {User} object
   * @throws {ValidationException} if user with unique field found
   */
  async create(entity: Partial<User>): Promise<User> {
    throw new Error("Not implemented");
  }

  async updateUserProfile(token: string, data: any) {
    /**
     * Check if no user has the username,
     * checks if no person has email r
     * checks if no person has phone number
     * update user
     * update person
     * Update user profile updated flag to true
     */
    return await ServiceClient.callService("nishauri-users-ms", {
      url: "users/profile",
      method: "POST",
      headers: { "x-access-token": token },
      data: data,
    });
  }
  /**
   * Finds user with specified id
   * @param id User unique id
   * @throws {NotFoundException}
   * @returns {User} user object
   */
  async findOneById(id: string, token: string): Promise<User> {
    return await ServiceClient.callService("nishauri-users-ms", {
      url: `users/${id}`,
      method: "GET",
      headers: { "x-access-token": token },
    });
  }

  async findAll(token: string): Promise<User[]> {
    return await ServiceClient.callService("nishauri-users-ms", {
      url: `users`,
      method: "GET",
      headers: { "x-access-token": token },
    });
  }
  async findByCriteria(
    criteria: Record<string, any>,
    token: string
  ): Promise<User[]> {
    return await ServiceClient.callService("nishauri-users-ms", {
      url: `users`,
      method: "GET",
      headers: { "x-access-token": token },
      params: criteria,
    });
  }
  /**
   * updates user if no other user with unique fields like phoneNumber, email or username dont exist
   * @param id - user to update its information
   * @param updates user information to be updated
   * @throws {ValidationException}
   * @returns updated user
   */
  async updateById(
    id: string,
    updates: Partial<User>,
    token: string
  ): Promise<User> {
    return await ServiceClient.callService("nishauri-users-ms", {
      url: `users/${id}`,
      method: "PUT",
      headers: { "x-access-token": token },
      data: updates,
    });
  }
  async deleteById(id: string, token: string): Promise<User> {
    return await ServiceClient.callService("nishauri-users-ms", {
      url: `users/${id}`,
      method: "DELETE",
      headers: { "x-access-token": token },
    });
  }
}

export default UserRepository;
