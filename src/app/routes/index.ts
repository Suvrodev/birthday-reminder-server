import express from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { ServiceRoute } from "../modules/Service/service.route";
import { blogRoutes } from "../modules/Blog/blog.route";
import { portfoliooRoutes } from "../modules/portfolioo/portfolioo.route";
import { resumeRoutes } from "../modules/resume/resume.route";
import { MailRoute } from "../modules/mail/mail.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/service",
    route: ServiceRoute,
  },
  {
    path: "/portfolioo",
    route: portfoliooRoutes,
  },

  {
    path: "/blog",
    route: blogRoutes,
  },
  {
    path: "/resume",
    route: resumeRoutes,
  },
  {
    path: "/mail",
    route: MailRoute,
  },

  {
    path: "/login",
    route: AuthRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
