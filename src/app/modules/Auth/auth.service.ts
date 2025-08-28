import config from "../../config";
import AppError from "../../errors/AppError";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { userModel } from "./auth.model";

const loginUser = async (payload: TLoginUser) => {
  // Step 1: Check if user exists
  let isUserExists = await userModel.findOne({ email: payload.email });

  // Step 2: If not exists, create a new user
  if (!isUserExists) {
    isUserExists = await userModel.create(payload);
  }

  // Step 3: Check if user is blocked
  if (isUserExists.isBlocked) {
    throw new AppError(403, "User is Blocked");
  }

  // Step 4: Create JWT payload
  const jwtPayload = {
    _id: isUserExists._id,
    firstName: isUserExists.firstName,
    lastName: isUserExists.lastName,
    email: isUserExists.email,
    role: isUserExists.role,
    isBlocked: isUserExists.isBlocked,
    phone: isUserExists.phone,
    profileImage: isUserExists.profileImage,
  };

  // Step 5: Sign token
  const accessToken = Jwt.sign(jwtPayload, config.jwt_access_token as string, {
    expiresIn: "30d",
  });
  return {
    accessToken,
  };
};

const getAllUserFromDB = async () => {
  const result = await userModel.find();
  return result;
};

const getMeFromDB = async (email: string) => {
  // Step 1: Check if user exists
  const isUserExists = await userModel.findOne({ email });
  // console.log("is User exists: ", isUserExists);

  // Step 2: If not exists, create a new user
  if (!isUserExists) {
    throw new AppError(404, "User not Found");
  }

  // Step 3: Check if user is blocked
  if (isUserExists.isBlocked) {
    throw new AppError(403, "User is Blocked");
  }

  return isUserExists;
};

const updateUserProfile = async (email: string, payload: TLoginUser) => {
  console.log("For Update User profile");
  console.log("Email :", email);
  console.log("Payload: ", payload);

  // Step 1: Find user by email
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new AppError(404, "User not found");
  }

  // Step 2: Check if blocked
  if (user.isBlocked) {
    throw new AppError(403, "User is blocked");
  }

  // Step 3: Update fields (ignore undefined)

  const result = await userModel.findOneAndUpdate({ email: email }, payload, {
    new: true,
  });

  if (!result) {
    throw new AppError(404, "User Not Found");
  }
  // Step 4: Create JWT payload
  const jwtPayload = {
    _id: result._id,
    firstName: result.firstName,
    lastName: result.lastName,
    email: result.email,
    role: result.role,
    isBlocked: result.isBlocked,
    phone: result.phone,
    profileImage: result.profileImage,
  };

  // Step 5: Sign token
  const accessToken = Jwt.sign(jwtPayload, config.jwt_access_token as string, {
    expiresIn: "30d",
  });

  return accessToken;
};

export const AuthServices = {
  loginUser,
  getAllUserFromDB,
  getMeFromDB,
  updateUserProfile,
};
