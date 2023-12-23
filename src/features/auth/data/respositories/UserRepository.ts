import { Types } from "mongoose";
import { User } from "../models";

const getUserProfileById = async (id: string | Types.ObjectId) => {
  const userId = id instanceof String ? new Types.ObjectId(id) : id;
  return User.aggregate([
    {
      $match: {
        _id: userId,
      },
    },
    {
      $lookup: {
        from: "people",
        as: "person",
        foreignField: "user",
        localField: "_id",
      },
    },
    { $project: { password: 0, __v: 0, "person.__v": 0 } },
  ]);
};

export default {
  getUserProfileById,
};
