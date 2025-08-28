import express from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

router.post("/", AuthControllers.loginUser);
router.get("/me/:email", AuthControllers.getMe);
router.patch("/update/:email", AuthControllers.UpdateUser);

export const AuthRoutes = router;
