import express from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

router.post("/", AuthControllers.loginUser);
router.get(
  "/me/:email",
  () => {
    console.log("Check Get Me");
  },
  AuthControllers.getAllUser
);
router.get("/all-user", AuthControllers.getAllUser);
router.patch("/update/:email", AuthControllers.UpdateUser);

export const AuthRoutes = router;
