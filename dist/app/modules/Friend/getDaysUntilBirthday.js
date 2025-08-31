"use strict";
// export const getDaysUntilBirthday = (birthDateStr: string) => {
//   const today = new Date();
//   const birthDate = new Date(birthDateStr);
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDaysUntilBirthday = void 0;
//   const todayDate = new Date(
//     today.getFullYear(),
//     today.getMonth(),
//     today.getDate()
//   );
//   const nextBirthday = new Date(
//     today.getFullYear(),
//     birthDate.getMonth(),
//     birthDate.getDate()
//   );
//   if (nextBirthday < todayDate) {
//     nextBirthday.setFullYear(today.getFullYear() + 1);
//   }
//   const diffTime = nextBirthday.getTime() - todayDate.getTime();
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   return diffDays;
// };
const date_fns_tz_1 = require("date-fns-tz");
const getDaysUntilBirthday = (birthDateStr) => {
    const timeZone = "Asia/Dhaka";
    // আজকের তারিখ Bangladesh time zone এ convert
    const today = (0, date_fns_tz_1.toZonedTime)(new Date(), timeZone);
    // জন্মদিন Bangladesh time zone এ convert
    const birthDate = (0, date_fns_tz_1.toZonedTime)(new Date(birthDateStr), timeZone);
    // শুধু তারিখ (ঘণ্টা, মিনিট বাদ)
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < todayDate) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const diffTime = nextBirthday.getTime() - todayDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};
exports.getDaysUntilBirthday = getDaysUntilBirthday;
