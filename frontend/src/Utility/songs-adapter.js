export default function songsAdapter(songsJson) {
  const formatted = songsJson.map((song) => ({
    ...song,
    id: song._id,
    songTitle: song.songTitle[0],
  }));

  return formatted;
}

export function songsSearchAdapter(songsJson) {
  const formatted = songsJson.map((songObject) => {
    const song = songObject.item;

    return {
      ...song,
      id: song._id,
      songTitle: song.songTitle[0],
    };
  });

  return formatted;
}
