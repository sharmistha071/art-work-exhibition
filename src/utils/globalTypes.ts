export type FormattedArtWork = {
  id: number;
  title: string;
  alt_text: string;
  thumbnail?: string;
};

export type OriginalArtWork = {
  id: number;
  title: string;
  alt_text: string;
  thumbnail: {
    alt_text: string;
  };
};
