// export const getDaysUntilBirthday = (birthDateStr: string) => {
//   const today = new Date();
//   const birthDate = new Date(birthDateStr);

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

import { toZonedTime } from "date-fns-tz";

export const getDaysUntilBirthday = (birthDateStr: string) => {
  const timeZone = "Asia/Dhaka";

  // আজকের তারিখ Bangladesh time zone এ convert
  const today = toZonedTime(new Date(), timeZone);

  // জন্মদিন Bangladesh time zone এ convert
  const birthDate = toZonedTime(new Date(birthDateStr), timeZone);

  // শুধু তারিখ (ঘণ্টা, মিনিট বাদ)
  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  let nextBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  if (nextBirthday < todayDate) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  const diffTime = nextBirthday.getTime() - todayDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};
