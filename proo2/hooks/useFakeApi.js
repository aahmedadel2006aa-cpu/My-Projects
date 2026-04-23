import { fakeDelay } from "../utils/helpers.js";

export const withFakeApi = async (callback, delay = 700) => {
  await fakeDelay(delay);
  return callback();
};
