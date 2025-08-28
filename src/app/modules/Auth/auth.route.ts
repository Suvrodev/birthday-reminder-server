import express from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

router.post("/", AuthControllers.loginUser);

export const AuthRoutes = router;
