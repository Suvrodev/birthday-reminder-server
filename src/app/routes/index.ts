import express from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { FriendRoutes } from "../modules/Friend/friend.route";

import { MailRoute } from "../modules/mail/mail.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/friend",
    route: FriendRoutes,
  },

  {
    path: "/login",
    route: AuthRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
