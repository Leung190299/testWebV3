import type { Model } from '@/types/model';
import Time from '@/utilities/time';
import { ImageService } from '../image/image';
import { pickRandomGift } from '../gift';
import { randomBetween } from '@/utilities/number';

interface GenSimParams {
  exclude?: number[];
  include?: number[];
  type?: string;
  limit?: number;

  prefix?: string;
}

export function generateSimNumber({ exclude, include, type, limit = 10, prefix = '087' }: GenSimParams) {
  let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (exclude) {
    numbers = numbers.filter((v) => !exclude.includes(v));
  }
  if (numbers.length === 0) return [];

  const sims: Array<Model.Sim & { gift?: Model.Gift; pack: Model.PackOfData }> = [];
  let poolNumber: Array<string>;
  if (numbers.length < 4) {
    poolNumber = findCombinations(numbers, 7);
  }
  const maxRandomNumber = Math.pow(numbers.length, 7);
  const randomedNumber = new Set<string>();

  let threshold = 0;

  let i = 0;
  while (i < limit) {
    if (threshold > 100) throw new Error('Too much looping');
    threshold++;
    let phone = prefix;
    if (randomedNumber.size === maxRandomNumber) break;
    if (numbers.length < 4) {
      const randomIndex = Math.floor(Math.random() * poolNumber!.length);
      phone += poolNumber![randomIndex];
      poolNumber!.splice(randomIndex, 1);
    } else {
      for (let i = 0; i < 7; i++) {
        phone += numbers[Math.floor(Math.random() * numbers.length)];
      }
      if (randomedNumber.has(phone)) continue;
    }
    randomedNumber.add(phone);
    i++;
    const expries = new Date();
    expries.setDate(expries.getDate() + Math.floor(Math.random() * 5));
    const price = randomBetween(10, 20);
    const discount_price = randomBetween(5, price);
    const sim: Model.Sim & { pack: any; gift?: any } = {
      id: i + 1,
      phone,
      price: price * 20_000,
      discount_price: discount_price * 20_000,
      is_vip: Math.random() > 0.5 ? true : false,
      sale_expiry: Math.random() > 0.5 ? Time.getRandomDay(new Date(), expries).toISOString() : null,

      pack: {
        data: 5_000_000,
        data_type: 'day',
        id: 1,
        name: 'ITEL149',
        price: 200_000,
        discount_price: randomBetween(5, 10) * 20_000,
        price_type: 'month'
      }
    };
    const gift =
      Math.random() > 0.6
        ? undefined
        : { ...pickRandomGift(), id: 1, image: ImageService.random(), price: randomBetween(10, 20) * 50_000, count: 1 };
    if (gift) {
      sim.gift = gift;
    }
    sims.push(sim);
  }

  return sims;
}
function findCombinations<T>(numbers: T[], length: number) {
  const combinations: string[] = [];

  function backtrack(combination: string, startIndex: number) {
    if (combination.length === length) {
      combinations.push(combination);
      return;
    }

    for (let i = startIndex; i < numbers.length; i++) {
      backtrack(combination + numbers[i], i);
    }
  }

  backtrack('', 0);

  return combinations;
}
