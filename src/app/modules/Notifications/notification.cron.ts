import cron from "node-cron";
import { createUpcomingBirthdayNotifications } from "./notification.service";

// Run every day at 8:00 AM
// cron.schedule("0 0 * * *", async () => {
//   console.log("Running daily birthday notification check...");
//   await createUpcomingBirthdayNotifications();
// });

// Server start e ekbar immediate run
createUpcomingBirthdayNotifications()
  .then(() => console.log("Initial birthday notifications created"))
  .catch((err) => console.error("Error creating notifications:", err));
