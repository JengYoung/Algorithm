function getMelody(time, melody) {
    function getRemainderMelody(melody, time) {
        let cnt = 0;
        let i = 0;
        let result = "";
        while (cnt !== time) {
            const now = melody[i];
            i++;
            if (now === "#") {
                result += now;
                continue;
            }
            result += now;
            cnt++;
        }
        if (melody[i] === "#") result += melody[i];
        return result;
    }
    const melodyLength = [...melody].filter(val => val !== '#').length;
    if (time <= melodyLength) {
        return getRemainderMelody(melody, time)
    } else {
        const remainder = time % melodyLength;
        const quotient = (time - remainder) / melodyLength;
        let result = '';
        for (let i = 0; i < quotient; i++) {
            result += melody;
        }
        return result += getRemainderMelody(melody, remainder);
    }
}
function getTime(time) {
    const [m, s] = time.split(':');
    return m * 60 + s * 1;
}
function solution(m, musicinfos) {
    let answer = "";
    let answerTime = 0;
    musicinfos.forEach(musicinfo => {
        const [start, end, title, melody] = musicinfo.split(',');
        const time = getTime(end) - getTime(start);
        const melodies = getMelody(time, melody);
        
        /*
            flag: 만약 멜로디가 있다면 true
            melodyIndices: 해당하는 모든 인덱스의 배열
            melodyIdx: 기억하고 있는 멜로디가 위치한 인덱스
        */
        const melodyIndices = [];
        let melodyIdx = melodies.indexOf(m);
        
        while (melodyIdx !== -1) {
            melodyIndices.push(melodyIdx);
            melodyIdx = melodies.indexOf(m, melodyIdx + 1);
        }
        melodyIndices.forEach(idx => {
            if (melodies[idx + m.length] !== '#') {
                if (answerTime < time) {
                    answer = title;
                    answerTime = time;
                }
            }
        })
        console.log(answer);
    })
    return answer.length === 0 ? `(None)` : answer;
}


const m = "ABC";
const musicinfos = ["12:00,12:14,HELLO,C#DEFGAB", "13:00,13:05,WORLD,ABCDEF"]
console.log(solution(m, musicinfos))
