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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const app = (0, express_1.default)();
//Parser
// app.use(express.json());
app.use(express_1.default.json({ limit: "5mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "5mb" }));
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:3001",
    "https://birthday-reminder-ebon.vercel.app",
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true); // allow non-browser requests
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(null, false); // just deny without throwing error
        }
    },
    credentials: true,
}));
//Routes Configuration
app.use("/api", routes_1.default);
const getAController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Welcome to Birthday Reminder Project");
});
app.get("/", getAController);
//Global Error Handler
app.use(globalErrorHandler_1.default);
//Not Found Route
app.use(notFound_1.default);
exports.default = app;
