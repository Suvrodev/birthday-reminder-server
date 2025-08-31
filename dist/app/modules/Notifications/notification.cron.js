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
const node_cron_1 = __importDefault(require("node-cron"));
const notification_service_1 = require("./notification.service");
// Run every day at 1:00 AM Bangladesh time
node_cron_1.default.schedule("0 1 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Running daily birthday notification check at 1 AM Bangladesh time...");
    yield (0, notification_service_1.createUpcomingBirthdayNotifications)();
}), {
    timezone: "Asia/Dhaka", // Bangladesh time
});
// Server start e ekbar immediate run
// createUpcomingBirthdayNotifications()
//   .then(() => console.log("Initial birthday notifications created"))
//   .catch((err) => console.error("Error creating notifications:", err));
