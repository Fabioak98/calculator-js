const display = document.querySelector('.display');
const keyNum = document.querySelectorAll('[key-num]');
const keyOp = document.querySelectorAll('[key-op]');
const keyEq = document.querySelector('[key-equal]');

let pastNum = null;
let currOp = null;
let lastKey = null;
const opSimbol = ['+','-','/','X']


function onLoad(){
    display.textContent = '0'
}

function calculate(){
    let curr = display.textContent
    switch(currOp){
        case '+':
                display.textContent = parseFloat(curr) + parseFloat(pastNum);
                break;
        case '-':
                display.textContent = +(pastNum) - parseFloat(curr);
            break;
        case 'X':
                display.textContent = parseFloat(curr) * parseFloat(pastNum);
            break;
        case '/':
                display.textContent = parseFloat(pastNum)/parseFloat(curr);
            break;
        default:
    }
    currOp = null;
    pastNum = display.textContent;

}

function opVal(op){
    if(opSimbol.includes(op)){
        currOp = op;
        pastNum = display.textContent;
    }
    else{
        if(op === 'C'){
            pastNum = null;
            currOp = null;
        }
    }
}

function displayVal(number){
    if(number !== '.'){
        if(display.textContent === '0')
            display.textContent = number;
        else
            display.textContent = display.textContent + number;
    }
    else{
        if(display.textContent.includes('.'))
            return
        else
            display.textContent = display.textContent + number;
    }
}

keyNum.forEach(button=>{
    button.addEventListener('click',e =>{
        if(lastKey === '='){
            opVal('C');
        }
        else if(opSimbol.includes(lastKey)){
            display.textContent = '0';
        }
        displayVal(e.target.textContent);
        lastKey = e.target.textContent;
    })
})


keyOp.forEach(button=>{
    button.addEventListener('click',e=>{
        let pressed = e.target.textContent;
        if(currOp === null || pressed === 'C' || pressed === 'CE'){
            opVal(pressed);
            display.textContent = '0';
        }
        else{
            calculate(currOp);
            opVal(pressed);
        }
        lastKey = pressed;
    })
})

keyEq.addEventListener('click',e=>{
    calculate();
    lastKey = e.target.textContent;
})