import dayjs, { Dayjs, ConfigType } from 'dayjs';
import { randomBetween } from './number';

export default class Time {
  static getTimeFromSeconds(secs: number) {
    const totalSeconds = Math.ceil(secs);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return {
      totalSeconds,
      seconds,
      minutes,
      hours,
      days
    };
  }

  static getSecondsFromExpiry(expiry: number, shouldRound?: boolean) {
    const now = new Date().getTime();

    const milliSecondsDistance = expiry - now;
    if (milliSecondsDistance > 0) {
      const val = milliSecondsDistance / 1000;
      return shouldRound ? Math.round(val) : val;
    }
    return 0;
  }

  static getRandomDay(startDate: ConfigType, endDate: ConfigType) {
    // Calculate the time difference in milliseconds
    const startTime = dayjs(startDate).valueOf();
    const endTime = dayjs(endDate).valueOf();

    // Generate a random number within the time difference
    const randomTime = randomBetween(startTime, endTime);

    // Create a new Date object with the random time
    const randomDate = new Date(randomTime);

    return randomDate;
  }
}
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
