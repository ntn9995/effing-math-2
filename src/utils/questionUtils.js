const OP = ['+', '-', 'x', '/'];
const PRIMES = [2,3,5,7,11,13,17,19,21,23,29];

const randInt = (min, max) => Math.random() * (max - min) + min;

const getMultiplier = x => PRIMES.find(e => (x % e) === 0);

const getOp = () => OP[Math.floor(Math.random()*OP.length)];

const getQuestion = (op, difficulty) => {
    let randFirst = 0;
    let randSecond = 0;

    switch(difficulty){
        case 1:
            randFirst = randInt(0, 10);
            randSecond = randInt(2, 10);
            break;
        
        case 2:
            randFirst = randInt(10, 21);
            randSecond = randInt(2, 10);
            break;

        case 3:
            randFirst = randInt(10, 31);
            randSecond = randInt(2, 21);
            break;

        default:
            break;
    }

    if (op === '/') {
        if (PRIMES.includes(randFirst)){
            if (randFirst === 2){
                randFirst = 4
            } else {
                randFirst++;
            }
        }
        randSecond = getMultiplier(randFirst);
    }

    console.log(randomFirst + ' ' + op + ' '  + randomSecond); 

    let ans = 0;
    switch(op) {
        case '+':
            ans = randomFirst + randomSecond;
            break;
        case '-':
            ans = randomFirst - randomSecond;
            break;
        case 'x':
            ans = randomFirst * randomSecond;
            break;
        case '/':
            ans = randomFirst / randomSecond;
            break;
        default:
            break;
    }

    return {randFirst, randSecond, ans};
}

export function getQuestion(settings) {
    const {difficulty} = settings;
    const op = getOp();
    const {first, second, correctAns} = getQuestion(op, difficulty);

    return {first, second, op, correctAns};
}