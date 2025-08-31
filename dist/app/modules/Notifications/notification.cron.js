"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notification_service_1 = require("./notification.service");
// Run every day at 8:00 AM
// cron.schedule("0 0 * * *", async () => {
//   console.log("Running daily birthday notification check...");
//   await createUpcomingBirthdayNotifications();
// });
// Server start e ekbar immediate run
(0, notification_service_1.createUpcomingBirthdayNotifications)()
    .then(() => console.log("Initial birthday notifications created"))
    .catch((err) => console.error("Error creating notifications:", err));
