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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const auth_service_1 = require("./auth.service");
//Login User
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Come Data to Login: ", req.body);
        const result = yield auth_service_1.AuthServices.loginUser(req.body);
        res.status(200).json({
            success: true,
            message: "Login successful",
            statusCode: 200,
            data: {
                token: result === null || result === void 0 ? void 0 : result.accessToken,
            },
        });
    }
    catch (error) {
        next(error);
        // throw new AppError(401, error);
    }
});
//Find Me
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("ki re baaal");
        const result = yield auth_service_1.AuthServices.getAllUserFromDB();
        res.status(200).json({
            success: true,
            message: "User Find Successfully",
            statusCode: 200,
            data: result,
        });
    }
    catch (error) {
        next(error);
        // throw new AppError(401, error);
    }
});
//Find Me
const getMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const email = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.email;
        console.log("Come Email: ", email);
        const result = yield auth_service_1.AuthServices.getMeFromDB(email);
        res.status(200).json({
            success: true,
            message: "User Find Successfully",
            statusCode: 200,
            data: result,
        });
    }
    catch (error) {
        next(error);
        // throw new AppError(401, error);
    }
});
//Find Me
const UpdateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const email = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.email;
        const payload = req === null || req === void 0 ? void 0 : req.body;
        const result = yield auth_service_1.AuthServices.updateUserProfile(email, payload);
        res.status(200).json({
            success: true,
            message: "User Udpated Successfully",
            statusCode: 200,
            data: result,
        });
    }
    catch (error) {
        next(error);
        // throw new AppError(401, error);
    }
});
exports.AuthControllers = {
    loginUser,
    getAllUser,
    getMe,
    UpdateUser,
};
