import { z } from "zod";
import { LoginSchema, RegisterSchema } from "../../presentation";
import { Person, User } from "../models";
import bcrypt from "bcrypt";
import { isEmpty } from "lodash";

const checkPassword = async (user: any, password: string) => {
  const valid = await bcrypt.compare(password, user.password);
  return valid;
};

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const loginUser = async ({
  password,
  username,
  confirmPassword,
}: z.infer<typeof LoginSchema>) => {
  /**
   * get persons with email or phone number equals provided username
   * Gets user with username or id in user ids
   * Check all user against provided password
   * return fist user whos creds matched
   * else return undefined
   */
  const person = await Person.find({
    $or: [{ email: username }, { phoneNumber: username }],
  }).select("user");
  const _userIds = person.map(({ user }) => user);
  const users = await User.find({
    $or: [{ username }, { _id: { $in: _userIds } }],
  });
  const passwordChecks = await Promise.all(
    users.map((user) => checkPassword(user, password))
  );
  if (passwordChecks.every((val) => val === false))
    throw {
      errors: { password: { _errors: ["Invalid username or password"] } },
      status: 400,
    };
  return users[passwordChecks.findIndex((val) => val)];
};

const registerUser = async ({
  email,
  password,
  phoneNumber,
  username,
}: z.infer<typeof RegisterSchema>) => {
  /**
   * Check if no user has the username,
   * checks if no person has email r
   * checks if no person has phone number
   * creates user
   * creates person
   * return user
   * else return underfinied
   */
  const errors: any = {};

  if (await User.findOne({ username }))
    errors["username"] = { _errors: ["Username taken"] };

  if (await Person.findOne({ email }))
    errors["email"] = { _errors: ["Email taken taken"] };

  if (await Person.findOne({ phoneNumber }))
    errors["phoneNumber"] = { _errors: ["phoneNumber taken"] };

  if (!isEmpty(errors)) throw { status: 400, errors };

  const user = new User({ username, password: await hashPassword(password) });
  await user.save();

  const person = new Person({ user: user.id, email, phoneNumber });
  await person.save();
  return user;
};

export default {
  registerUser,
  loginUser,
};