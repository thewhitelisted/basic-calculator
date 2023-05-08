// running total has the current total, which is defined by the buffer and the operator
let runningTotal = 0;
// buffer, the value displayed on the screen (i think)
let buffer = "0";
let previousOperator;

// screen
const screen = document.querySelector('.screen');

// on button click, see init()
function buttonClick(value){
    // if it's a symbol, go to handleSymbol
    if (isNaN(value)){
        handleSymbol(value);
    }else{ // else, handle the number
        handleNumber(value);
    }
    // after, display buffer, won't change if an operator was picked
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        // if C is clicked, reset everything
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        // if =, do the operation
        case '=':
            if (previousOperator === null) {
                return 
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        // backspace
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        // all four do the same thing, but with different input
        case '+':
            handleMath(symbol);
            break;
        case '−':
            handleMath(symbol);
            break;
        case '×':
            handleMath(symbol);
            break;
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else{
        // does the math
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '−') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer;
    }
}

// if number not 0, add to the end of string
function handleNumber(numberString){
    if (buffer === '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
        console.log(event.target.innerText);
    })
}

init();