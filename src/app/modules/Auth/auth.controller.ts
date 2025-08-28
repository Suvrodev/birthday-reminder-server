import { RequestHandler } from "express";
import { AuthServices } from "./auth.service";

//Login User
const loginUser: RequestHandler = async (req, res, next) => {
  try {
    console.log("Come Data to Login: ", req.body);

    const result = await AuthServices.loginUser(req.body);
    res.status(200).json({
      success: true,
      message: "Login successful",
      statusCode: 200,
      data: {
        token: result?.accessToken,
      },
    });
  } catch (error: any) {
    next(error);
    // throw new AppError(401, error);
  }
};

//Find Me
const getAllUser: RequestHandler = async (req, res, next) => {
  try {
    console.log("ki re baaal");
    const result = await AuthServices.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: "User Find Successfully",
      statusCode: 200,
      data: result,
    });
  } catch (error: any) {
    next(error);
    // throw new AppError(401, error);
  }
};
//Find Me
const getMe: RequestHandler = async (req, res, next) => {
  try {
    console.log("This is Get ME");
    const email = req?.params?.email;
    console.log("Come Email: ", email);

    const result = await AuthServices.getMeFromDB(email);
    res.status(200).json({
      success: true,
      message: "User Find Successfully",
      statusCode: 200,
      data: result,
    });
  } catch (error: any) {
    next(error);
    // throw new AppError(401, error);
  }
};

//Find Me
const UpdateUser: RequestHandler = async (req, res, next) => {
  try {
    const email = req?.params?.email;
    const payload = req?.body;

    const result = await AuthServices.updateUserProfile(email, payload);
    res.status(200).json({
      success: true,
      message: "User Udpated Successfully",
      statusCode: 200,
      data: result,
    });
  } catch (error: any) {
    next(error);
    // throw new AppError(401, error);
  }
};

export const AuthControllers = {
  loginUser,
  getAllUser,
  getMe,
  UpdateUser,
};
