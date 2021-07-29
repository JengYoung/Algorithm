const userObj = {
    name: 'Heropy',
    age: 85,
    email: 'thesecon@gmail.com'
    // isValid: true
}


// isValid 추가
const arrValid = (arr) =>  {
arr.push( [`isValid`, `true`])
return arr
}


// ver 1: Object.entries의 사용

const func1 = (obj) => {

    if(typeof obj !== 'object'){
        throw '객체를 입력해야 합니다.'
    }

    let arr = Object.entries(obj)
    arr = arrValid(arr)
    return arr
}

// ver 2: for in의 사용


const func2 = (obj) => {

    if(typeof obj !== 'object'){
        throw '객체를 입력해야 합니다.'
    }

    let arr = new Array()

    for (var p in obj) {
        arr.push([p, obj[p]])
    }

    arr = arrValid(arr)
    return arr
}


// ver 3: 고전적 반복문의 사용


const func3 = (obj) => {

    if(typeof obj !== 'object'){
        throw '객체를 입력해야 합니다.'
    }

    let arr = new Array()

    const keys = Object.keys(obj)

    for (let i=0; i < keys.length; i++){
        arr.push([keys[i], obj[keys[i]]])
    }

    arr = arrValid(arr)
    return arr
}


console.log(func1(userObj))
console.log(func2(userObj))
console.log(func3(userObj))



// 2. 배열 -> 객체


const userArr = [
['name', 'HEROPY'],
['age', 85],
['email', 'thesecon@gmail.com']
// ['isValid', true]
];

const userObj = {};

// isValid 추가
const objValid = (obj) =>  {
obj[`isValid`] = `true`
return obj
}


// ver 1. for .. of 의 사용

const func1 = (arr) => {

const obj = {}

for (const value of userArr) {
obj[value[0]] = value[1]
}

objValid(obj)
return obj
}


// ver 2. 고전적 for문

const func2 = (arr) => {

const obj = {}

for (let i=0; i < arr.length ; i++){
obj[arr[i][0]] = arr[i][1]    
}

objValid(obj)
return obj
}


// ver 3. forEach 이용한 함수

userArr.forEach((arr) => {

if(Array.isArray(arr) == false){
throw '배열을 입력해야 합니다.'
}

userObj[arr[0]] = arr[1]
objValid(userObj) // 객체 추가: 순서 보장 안 됨
})

console.log(func1(userArr));
console.log(func2(userArr));