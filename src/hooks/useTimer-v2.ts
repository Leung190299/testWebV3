import useCountdown from '@pit-ui/modules/hooks/useCountdown';
import Time from '@/utilities/time';

import dayjs from 'dayjs';

interface TimerOption {
  expiryTimestamp: dayjs.ConfigType;
  onFinish?(): void;
}

/**
 * interface with default value
 *
 * @param  {TimerOption} timerOption
 * @param  {number} expiryTimestamp.expiryTimestamp - the timestamp expiry number.
 * @param  {?boolean} expiryTimestamp.isIncrement - `false` by default, true if the countdown is increment.
 * @returns [counter, CountdownControllers]
 */
export default function useTimer(timerOption: TimerOption) {
  const { expiryTimestamp: expiry, onFinish } = timerOption;
  const [seconds, { resetCountdown, startCountdown, stopCountdown }] = useCountdown({
    countStop: 0,
    countStart: Time.getSecondsFromExpiry(dayjs(expiry).valueOf()),
    onFinish
  });

  return {
    ...Time.getTimeFromSeconds(seconds),
    start: startCountdown,
    stop: stopCountdown,
    restart: resetCountdown
  };
}
