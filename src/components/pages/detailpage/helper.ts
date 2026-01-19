export const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

interface Video {
  type: string;
  key: string;
}

export const getTrailerKey = (videos: Video[]): string | null => {
  return videos.find((video) => video.type === 'Trailer')?.key || null;
};
