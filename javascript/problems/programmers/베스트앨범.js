/*
    1. 속한 노래가 많이 재생된 장르를 먼저 수록합니다.
    2. 장르 내에서 많이 재생된 노래를 먼저 수록합니다.
    3. 장르 내에서 재생 횟수가 같은 노래 중에서는 고유 번호가 낮은 노래를 먼저 수록합니다.
*/

const sortByKey =
  (a, b) =>
  ({ key, sameCallback = () => 0 }) => {
    if (a[key] !== b[key]) {
      return a[key] - b[key];
    }

    return sameCallback(a, b);
  };

function solution(genres, plays) {
  const genreMap = new Map();

  genres.forEach((g) => {
    genreMap.set(g, {
      count: 0,
      albums: [],
    });
  });

  plays.forEach((p, index) => {
    const playGenre = genres[index];
    const nowGenre = genreMap.get(playGenre);

    nowGenre.count += p;
    nowGenre.albums.push({ index, count: p });
  });

  return [...genreMap.values()]
    .sort(sortByKey({ key: 'count' }))
    .map(({ albums }) => {
      return albums
        .sort(
          sortByKey({ key: 'count', sameCallback: sortByKey({ key: 'index' }) })
        )
        .filter((_, i) => i < 2)
        .map((album) => album.index);
    })
    .flat();
}

const genres = ['classic', 'pop', 'classic', 'classic', 'pop'];
const plays = [500, 600, 150, 800, 2500];

console.log(solution(genres, plays));
