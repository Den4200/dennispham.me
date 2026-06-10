import {
  IMMICH_ALBUM_ID,
  IMMICH_SHARE_KEY,
  IMMICH_URL,
} from "astro:env/server";

export type Asset = {
  id: string;
  originalFileName: string;
  fileCreatedAt: string;
  exifInfo: {
    exifImageWidth: number;
    exifImageHeight: number;
    orientation: string | null;
  };
  thumbhash: string;
};

export type Album = {
  albumName: string;
  assets: Asset[];
};

export const getAlbum = async (): Promise<Album> => {
  const res = await fetch(`${IMMICH_URL}/api/albums/${IMMICH_ALBUM_ID}`, {
    headers: { "x-immich-share-key": IMMICH_SHARE_KEY },
  });
  return res.json();
};

export const getPhotoDimensions = (asset: Asset) => {
  const rotated = ["5", "6", "7", "8"].includes(
    asset.exifInfo.orientation ?? "",
  );

  return {
    width: rotated
      ? asset.exifInfo.exifImageHeight
      : asset.exifInfo.exifImageWidth,
    height: rotated
      ? asset.exifInfo.exifImageWidth
      : asset.exifInfo.exifImageHeight,
  };
};
