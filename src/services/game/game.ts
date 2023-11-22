import games from '@/mock/game.json';
import { IGame } from '@/pages/igame';

const gameInfo = {
  generalInfo:
    'Lorem ipsum dolor sit amet consectetur. Augue felis ultrices praesent suscipit. Maecenas tristique mauris sed sed proin id sed ut. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. \n' +
    '\n' +
    'Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.',
  pointsInfo: {
    pointInfo:
      'Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum fe',
    rulesAndConditions:
      'Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum fe'
  },
  summary:
    'Lorem ipsum dolor sit amet consectetur. Augue felis ultrices praesent suscipit. Maecenas tristique mauris sed sed proin id sed ut.'
};

export interface IGameDetail extends IGame {
  generalInfo: string;
  pointsInfo: {
    pointInfo: string;
    rulesAndConditions: string;
  };
  summary: string;
}

class GameService {
  async getGames({ limit }: { limit: number }): Promise<IGame[]> {
    const listGame = await games.slice(0, limit);
    if (!listGame) return [];

    return listGame;
  }

  async getHotGames({ limit }: { limit: number }): Promise<IGame[]> {
    const listGame = await games.filter((game) => game.isHot).slice(0, limit);
    if (!listGame) return [];

    return listGame;
  }

  async getPlayingGames({ limit }: { limit: number }) {
    const listGame = await games.filter((game) => game.isPlaying).slice(0, limit);
    if (!listGame) return [];

    return listGame;
  }

  async getGameById(id: string): Promise<IGameDetail | null> {
    const game = await games.find((game: IGame) => game.id === id);
    if (!game) return null;

    return {
      ...game,
      generalInfo: gameInfo.generalInfo,
      pointsInfo: gameInfo.pointsInfo,
      summary: gameInfo.summary
    };
  }

  async getSimilarGameById(id: string): Promise<IGame[]> {
    const similarGame = await games.slice(0, 4);
    if (!similarGame) return [];

    return similarGame;
  }

  async getHotWeekGames({ limit }: { limit: number }): Promise<IGame[]> {
    const listGame = await games.filter((game) => game.isHotWeek).slice(0, limit);
    if (!listGame) return [];

    return listGame;
  }

  async getGamesDynamic({ limit }: { limit: number }): Promise<IGame[]> {
    const listGame = await games.slice(limit);
    if (!listGame) return [];

    return listGame;
  }
}

const gameService = new GameService();
export default gameService;
