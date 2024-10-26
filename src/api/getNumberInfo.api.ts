import httpRequest from "@/plugins/axios";
import { createEffect } from "effector";

export const fetchNumberInfoFx = createEffect(
  async ({ numberInfoType, randomNumberType, userTypedNumber, userTypedMonth }) => {
    let url = "";

    if (randomNumberType) {
      url = `/random/${randomNumberType}`;
    } else if (numberInfoType && userTypedNumber !== null) {
      if (numberInfoType === "math") {
        url = `/${userTypedNumber}/math`;
      } else if (numberInfoType === "trivia") {
        url = `/${userTypedNumber}`;
      } else if (numberInfoType === "date") {
        url = `/${userTypedMonth}/${userTypedNumber}/date`;
      }
    } else {
      throw new Error("Некорректный выбор информации. Проверьте настройки.");
    }

    const response = await httpRequest.get(url);
    return response;
  }
);
