// dailyReset.js
const cron = require("node-cron");
const User = require("../models/user");

// Hàm để chạy cron job reset vé mỗi ngày
const dailyResetTask = async () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      console.log("Running daily reset task...");

      // Lấy tất cả người dùng
      const users = await User.find({});

      // Lặp qua tất cả người dùng để reset vé nếu họ chưa đăng nhập hôm nay
      const currentDate = new Date().toISOString().split("T")[0]; // Ngày hiện tại (yyyy-mm-dd)

      for (const user of users) {
        const lastLoginDate = user.last_login
          ? user.last_login.toISOString().split("T")[0]
          : null;

        if (lastLoginDate !== currentDate) {
          // Reset lại số vé nếu chưa đăng nhập trong ngày hôm nay
          user.tickets = 0;
          await user.save();
        }
      }

      console.log("Daily reset task completed.");
    } catch (error) {
      console.error("Error during cron job:", error);
    }
  });
};

// Export hàm để có thể import ở nơi khác
module.exports = dailyResetTask;
