import { CardFilmItem } from "@/components/card/card-film";

const getMultipleRandom = (arr: CardFilmItem[], num: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
  
    return shuffled.slice(0, num);
  }

  export { getMultipleRandom };
