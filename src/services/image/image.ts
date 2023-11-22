import images from '@/mock/images.json';

export class ImageService {
  static get(index: number, type: 'midjourney' | 'avatar' = 'midjourney') {
    return images[type][index] ? images[type][index] : images[type][0];
  }
  static random() {
    const imgs = images.artworks;
    let img: string = '';
    while (!img) {
      const randomed = imgs[Math.floor(Math.random() * imgs.length)];
      if (typeof randomed === 'string') {
        img = randomed;
      } else {
        if (randomed.deleted_at) continue;
        img = randomed.thumbnail;
      }
    }

    return img;
  }

  static thumbnail() {
    const imgs = images.artworks;
    const img = imgs[Math.floor(Math.random() * imgs.length)];

    return img;
  }

  static randomArray(number: number) {
    const s = new Set<string>();
    const imgs = images.artworks;

    while (s.size < number) {
      const img = imgs[Math.floor(Math.random() * imgs.length)];
      if (typeof img === 'string') s.add(img);
      else {
        if (img.deleted_at !== null) continue;
        s.add(img.thumbnail);
      }
    }
    return Array.from(s);
  }
}
