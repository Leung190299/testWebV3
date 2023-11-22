import type { Model } from '@/types/model';

interface RenderImageItem {
  src: string;
  name: string;
  lastModified: number;
  id?: number;
}
const imagesRender = new Map<string, RenderImageItem>();

type IMGType = Model.File | File | string;
function fileToBlob(files?: IMGType | FileList | Array<IMGType>): RenderImageItem[] {
  if (!files) return [];
  const images: RenderImageItem[] = [];
  const f = Array.isArray(files) || files instanceof FileList ? files : [files];
  for (let i = 0; i < f.length; i++) {
    const file = f[i];
    if (typeof file === 'string') {
      images.push({ src: file, name: 'file_number_' + i, lastModified: Date.now() });
      continue;
    } else if ('url' in file) {
      images.push({ src: file.url, id: file.id, name: 'file_number_' + i, lastModified: Date.now() });
      continue;
    }

    const key = file.name + '_' + file.lastModified;
    if (imagesRender.has(key)) {
      images.push(imagesRender.get(key)!);
      continue;
    }

    imagesRender.set(key, { src: URL.createObjectURL(file), name: file.name, lastModified: file.lastModified });
    images.push(imagesRender.get(key)!);
  }
  return images;
}
async function getMeta(url: string): Promise<{ url: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight, url });
    img.onerror = (er) => reject(er);
    img.src = url;
  });
}
export { fileToBlob, getMeta };
