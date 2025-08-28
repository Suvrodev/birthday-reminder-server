"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/Auth/auth.route");
const service_route_1 = require("../modules/Service/service.route");
const blog_route_1 = require("../modules/Blog/blog.route");
const portfolioo_route_1 = require("../modules/portfolioo/portfolioo.route");
const resume_route_1 = require("../modules/resume/resume.route");
const mail_route_1 = require("../modules/mail/mail.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/service",
        route: service_route_1.ServiceRoute,
    },
    {
        path: "/portfolioo",
        route: portfolioo_route_1.portfoliooRoutes,
    },
    {
        path: "/blog",
        route: blog_route_1.blogRoutes,
    },
    {
        path: "/resume",
        route: resume_route_1.resumeRoutes,
    },
    {
        path: "/mail",
        route: mail_route_1.MailRoute,
    },
    {
        path: "/login",
        route: auth_route_1.AuthRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
