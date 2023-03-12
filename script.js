let displayed = "";
const screen = document.querySelector('.screen');
let isOn = true;
let ans = 0;
let op = "";
const audio = document.querySelector(`audio[data-key="1"]`);
const startAudio = document.querySelector(`audio[data-key="2"]`);
const errorAudio = document.querySelector(`audio[data-key="3"]`);
function playSound() {
    audio.curentTime = 0;
    audio.play();
}

function playStart() {
    startAudio.curentTime = 0;
    startAudio.play();
}

function playError() {
    errorAudio.currentTime = 0;
    errorAudio.play();
}

function add (a, b) {
    sum = parseFloat(a) + parseFloat(b);
    return Math.round(sum * 10000) / 10000;

}

function subtract (a, b) {
    diff = parseFloat(a) - parseFloat(b);
    return Math.round(diff * 10000) / 10000; 
}

function multiply (a, b) {
    product = parseFloat(a) * parseFloat(b);
    return Math.round(product * 10000) / 10000;
}

function divide (a, b) {
    res = parseFloat(a) / parseFloat(b);
    return Math.round(res * 10000) / 10000;  
}

function operate(operator, a, b) {
    if(operator === '+')
        return add(a, b);
    else if(operator === '-')
        return subtract(a, b);
    else if(operator === 'x')
        return multiply(a, b);
    else if(operator === '/')
        return divide(a, b);
}

const btn = document.getElementById('buttons');

btn.addEventListener('click', (event) => {
    
    const pressed = event.target.id;
    
    if(pressed == 'clear' || pressed == 'plus' || pressed == 'minus'
    || pressed == 'multiply' || pressed == 'divide' || pressed == equal || pressed == 'dot' || pressed == 'one' 
    || pressed == 'two' || pressed == 'three' || pressed == 'four' || pressed =='five' || pressed == 'six' || pressed == 'seven'
    || pressed == 'eight' || pressed == 'nine' || pressed == 'zero') 
        playSound();
    else if(pressed == 'on' && isOn == true)
        playStart();
    console.log('target is ' + pressed);
    console.log(event.target.id + ' is the event');
    let key = event.target.id;

    
    if(key === 'plus') {
        displayed += '+';
        display();
    }
    else if(key === 'minus') {
        displayed += '-';
        display();
    }
    else if(key === 'divide') {
        displayed += '/';
        display();
    }
    else if(key === 'multiply') {
        displayed += 'x';
        display();
    }
    else if(key === 'clear') {
        displayed = "";
        display();
    }
    else if(key === 'one') {
        displayed += '1';
        display();
    }
    else if(key === 'two') {
        displayed += '2';
        display();
    }
    else if(key === 'three') {
        displayed += '3';
        display();
    }
    else if(key === 'four') {
        displayed += '4';
        display();
    }
    else if(key === 'five') {
        displayed += '5';
        display();
    }
    else if(key === 'six') {
        displayed += '6';
        display();
    }
    else if(key === 'seven') {
        displayed += '7';
        display();
    }
    else if(key === 'eight') {
        displayed += '8';
        display();
    }
    else if(key === 'nine') {
        displayed += '9';
        display();
    }
    else if(key === 'zero') {
        displayed += '0';
        display();
    }
    else if(key === 'dot') {
        displayed += '.';

        display();
    }

})


function display() {
    screen.textContent = displayed;
}

function setState(state) {
    state = !state;     // to match the disable meaning.
    document.getElementById('zero').disabled = state;
    document.getElementById('one').disabled = state;
    document.getElementById('two').disabled = state;
    document.getElementById('three').disabled = state;
    document.getElementById('four').disabled = state;
    document.getElementById('five').disabled = state;
    document.getElementById('six').disabled = state;
    document.getElementById('seven').disabled = state;
    document.getElementById('eight').disabled = state;
    document.getElementById('nine').disabled = state;
    document.getElementById('dot').disabled = state;
    document.getElementById('plus').disabled = state;
    document.getElementById('minus').disabled = state;
    document.getElementById('multiply').disabled = state;
    document.getElementById('divide').disabled = state;
    document.getElementById('equal').disabled = state;

    
}

function power() {
    if(isOn === false) {
        // clear the screen
        displayed = "";
        const led = document.getElementById('state');
        led.innerHTML = 'z_z'
        led.style.fontWeight = '700';
        led.style.fontSize = '25px';
        led.style.backgroundColor = 'red';
        screen.textContent = displayed;
        screen.style.backgroundColor = 'gray';
        setState(false);
    }
    else {
        const led = document.getElementById('state');

        led.innerHTML = 'ツ'
        led.style.fontSize = '35px';
        led.style.fontWeight = '700';

        led.style.backgroundColor = 'green';

        screen.style.backgroundColor = 'greenyellow';
        setState(true)
        
    }
}

// power(false);
const powerBtn = document.getElementById('on');

powerBtn.addEventListener('click', function() {
    isOn = !isOn;
    power(isOn);
})


function calculate() {
    let string = displayed;
    console.log("displayed is " + displayed);
    // not valid if one of them conditions satisfied //
    /*
        1- there is at least two adjacent operators 
        2- the expression ends with an operator
    */
    let ok = 1;
    let n = string.length;
    // search for any adjacent operators 
    for(let i=0; i<n-1; i++) {
        if(string.charAt(i) == '+' || string.charAt(i) == '-' || string.charAt(i) == 'x' || string.charAt(i) == '/' || string.charAt(i) == '%')    // current index is an operator
        {
            if(string.charAt(i+1) == '+' || string.charAt(i+1) == '-' || string.charAt(i+1) == 'x' || string.charAt(i+1) == '/' || string.charAt(i+1) == '%') {    // current index is an operator
                ok = 0;
                ans = 0;
                break;
            }
        }
    }

    // if the string begins with operator or ends with operator
    // if(string.charAt(0) == '+' || string.charAt(0) == '-' || string.charAt(0) == 'x' || string.charAt(0) == '/' || string.charAt(0) == '%')    // First index is an operator
    //     ok = 0;
    if(string.charAt(n-1) == '+' || string.charAt(n-1) == '-' || string.charAt(n-1) == 'x' || string.charAt(n-1) == '/' || string.charAt(n-1) == '%')    // Last index is an operator
        ok = 0;

    if(!ok) {
        displayed = "Syntax Error! Press C to reset";
        console.log("displayed is " + displayed);
        playError();
        return ;
    }

    // if the expression doesn't contain any operators

    let hasOperator = 0;
    for(let i=0; i<n; i++) {
        let currentIdx = string.charAt(i);
        if(currentIdx == '+' || currentIdx == '-' || currentIdx == 'x' || currentIdx == '/' || currentIdx == '%')
            hasOperator = 1;
    }

    if(!hasOperator) {
        console.log('has not operators');
        ans = string;
        displayed = ans;
        return;
    }
    // Now if the expression starts with an operator

    let firstChar = string.charAt(0);

    let curr = "";
    let first = "";
    

    let start = 0;

    if(firstChar == '+' || firstChar == '-' || firstChar == 'x' || firstChar == '/' || firstChar == '%')
    {
        first = ans;
        curr = 0;
        op = firstChar;
        start = 1;
    }

    // Now, if the expressino is valid, calculate it and update the ans.
    // loop over the string ==> while string[i] is a number ==> append it to the number variable
    // at every operator    ==> calculate the value of the number first, second



    for(let i=start; i<n; i++) {
        if(string.charAt(i) == '+' || string.charAt(i) == '-' || string.charAt(i) == 'x' || string.charAt(i) == '/' || string.charAt(i) == '%') {
            if(op == "") {    // this is the first token
                first = curr;
                curr = "";
                op = string.charAt(i);
            }
            else {
                ans = operate(op, first, curr);
                first = ans;
                curr = "";
                op = string.charAt(i);
            }
        }
        else {
            curr = curr + string.charAt(i);
            ans = curr;
        }


    }

    ans = operate(op, first, curr);
    
    console.log('ans = ' + ans);
    console.log('displayed before ' + displayed);
    displayed = ans;
    console.log('displayed after = ' + displayed);

}

const equalBtn = document.getElementById('equal');

equalBtn.addEventListener('click', function(e) {

    playSound();
    console.log(ans);
    calculate();
    display();

    // reset global variables.
    ans = displayed;
    op = "";
    displayed = "";

})
