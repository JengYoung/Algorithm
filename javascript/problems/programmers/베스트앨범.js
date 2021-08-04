/*
    1. 속한 노래가 많이 재생된 장르를 먼저 수록합니다.
    2. 장르 내에서 많이 재생된 노래를 먼저 수록합니다.
    3. 장르 내에서 재생 횟수가 같은 노래 중에서는 고유 번호가 낮은 노래를 먼저 수록합니다.
*/

const solution = (genres, plays) => {
    let answer = [];
    /* genreObj = { 
        key: { 
            indicies: <Array>, // index를 담아놓는 배열
            playCount: <number> // 현재 장르가 실행된 총 횟수
        }
    }
    */
    const genreObj = {};
    genres.forEach((genre, index) => {
        genreObj[genre] = genreObj[genre] ? {
            indicies: [ ...genreObj[genre]["indicies"], index ],
            playCount: genreObj[genre]["playCount"] + plays[index]
        } : {
            indicies: [ index ],
            playCount: plays[index]
        }
    })
    const GenresRankArr = Object.values(genreObj).sort((a, b) => b["playCount"] - a["playCount"]);
    console.log(GenresRankArr)
    GenresRankArr.forEach(({ indicies }) => {
        indicies.sort((a, b) => (plays[b] !== plays[a]) ? (plays[b] - plays[a]) : (a - b));
        answer = [ ...answer, ...indicies.slice(0, 2) ]
    })
    return answer;
}
const genres = [ "classic", "pop", "classic", "classic", "pop" ];
const plays = [ 500, 600, 150, 800, 2500 ];

console.log(solution(genres, plays))