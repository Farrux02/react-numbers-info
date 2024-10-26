import { fetchNumberInfoFx } from "@/api/getNumberInfo.api";
import { createEvent, createStore } from "effector";

export const setNumberInfoType = createEvent<string>();

export const $numberInfoType = createStore<string>("").on(
  setNumberInfoType,
  (_, val) => val
);

export const setUserTypedNumber = createEvent<number | null>();

export const setUserTypedMonth = createEvent<number | null>();

export const $userTypedNumber = createStore<number | null>(null).on(
  setUserTypedNumber,
  (_, val) => val
);

export const $userTypedMonth = createStore<number | null>(null).on(
  setUserTypedMonth,
  (_, val) => val
);

export const setRandomNumberType = createEvent<string>();

export const $randomNumberType = createStore<string>("").on(
  setRandomNumberType,
  (_, val) => val
);

export const $numberInfo = createStore(null)
  .on(fetchNumberInfoFx.doneData, (_, data) => data)
  .reset(fetchNumberInfoFx.fail);

export const $numberInfoError = createStore(null)
  .on(fetchNumberInfoFx.failData, (_, error) => error.message)
  .reset(fetchNumberInfoFx.done);
