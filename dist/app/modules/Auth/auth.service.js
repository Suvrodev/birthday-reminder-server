"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_model_1 = require("./auth.model");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Step 1: Check if user exists
    let isUserExists = yield auth_model_1.userModel.findOne({ email: payload.email });
    // Step 2: If not exists, create a new user
    if (!isUserExists) {
        isUserExists = yield auth_model_1.userModel.create(payload);
    }
    // Step 3: Check if user is blocked
    if (isUserExists.isBlocked) {
        throw new AppError_1.default(403, "User is Blocked");
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
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_token, {
        expiresIn: "30d",
    });
    return {
        accessToken,
    };
});
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.userModel.find();
    return result;
});
const getMeFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Hiii");
    // Step 1: Check if user exists
    const isUserExists = yield auth_model_1.userModel.findOne({ email });
    console.log("is User exists: ", isUserExists);
    // Step 2: If not exists, create a new user
    if (!isUserExists) {
        throw new AppError_1.default(404, "User not Found");
    }
    // Step 3: Check if user is blocked
    if (isUserExists.isBlocked) {
        throw new AppError_1.default(403, "User is Blocked");
    }
    return isUserExists;
});
const updateUserProfile = (email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("For Update User profile");
    console.log("Email :", email);
    console.log("Payload: ", payload);
    // Step 1: Find user by email
    const user = yield auth_model_1.userModel.findOne({ email });
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    // Step 2: Check if blocked
    if (user.isBlocked) {
        throw new AppError_1.default(403, "User is blocked");
    }
    // Step 3: Update fields (ignore undefined)
    const result = yield auth_model_1.userModel.findOneAndUpdate({ email: email }, payload, {
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(404, "User Not Found");
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
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_token, {
        expiresIn: "30d",
    });
    return accessToken;
});
exports.AuthServices = {
    loginUser,
    getAllUserFromDB,
    getMeFromDB,
    updateUserProfile,
};
