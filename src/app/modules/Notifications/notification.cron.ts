import cron from "node-cron";
import { createUpcomingBirthdayNotifications } from "./notification.service";

// Run every day at 1:00 AM Bangladesh time
cron.schedule(
  "0 1 * * *",
  async () => {
    console.log(
      "Running daily birthday notification check at 1 AM Bangladesh time..."
    );
    await createUpcomingBirthdayNotifications();
  },
  {
    timezone: "Asia/Dhaka", // Bangladesh time
  }
);
// Server start e ekbar immediate run
// createUpcomingBirthdayNotifications()
//   .then(() => console.log("Initial birthday notifications created"))
//   .catch((err) => console.error("Error creating notifications:", err));
