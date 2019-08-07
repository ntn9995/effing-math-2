const OPS = ['+', '-', 'x', '/'];
const PRIMES = [2,3,5,7,11,13,17,19,21,23,29];

const randInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const getMultiplier = x => {
    return PRIMES.find(e => (x % e) === 0);
};

const getOp = () => {
    return OPS[Math.floor(Math.random()*OPS.length)];
}

const getOperands = (op, difficulty) => {
    let first = 0;
    let second = 0;

    switch(difficulty){
        case 1:
            first = randInt(0, 10);
            second = randInt(2, 10);
            break;
        
        case 2:
            first = randInt(10, 21);
            second = randInt(2, 10);
            break;

        case 3:
            first = randInt(10, 31);
            second = randInt(2, 21);
            break;

        default:
            break;
    }

    if (op === '/') {
        if (PRIMES.includes(first) || first === 1){
            if (first === 2){
                first = 4
            } else {
                first++;
            }
        }
        second = getMultiplier(first);
    }
    let correctAns = 0;
    switch(op) {
        case '+':
            correctAns = first + second;
            break;
        case '-':
            correctAns = first - second;
            break;
        case 'x':
            correctAns = first * second;
            break;
        case '/':
            correctAns = first / second;
            break;
        default:
            break;
    }

    return {first, second, correctAns};
}

export function getQuestion(difficulty) {
    const op = getOp();
    const {first, second, correctAns} = getOperands(op, difficulty);

    return {first, second, op, correctAns};
}