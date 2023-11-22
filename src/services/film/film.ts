import { CardFilmItem } from '@/components/card/card-film';
import film from '@/mock/film.json';

class FilmService {
  async getFilms({ limit, arr }: { limit: number, arr: CardFilmItem[] }): Promise<CardFilmItem[]> {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    if (!shuffled) return [];
    return shuffled.slice(0, limit);
  }
}

const filmService = new FilmService();
export default filmService;
