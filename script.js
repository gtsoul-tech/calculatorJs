function add(first,second){
    return +first + +second;
}
function subtract(first,second){
    return +first - +second;
}
function multiply(first,second){
    return +first * +second;
}
function divide(first,second){
    return +first / +second;
}
function operation(first,second,op){
    switch (op) {
        case '+':
             return add(first,second);
        case '-':
            return subtract(first,second);
        case '*':
            return multiply(first,second);
        case '/':
            return divide(first,second);
        case '%':
            return +first/100;
        default:
            console.log(`Sorry, Wrong ${op}.`);
    }

}

let upperDisplay="";
let currentDisplay="0";

const upperText = document.querySelector("#screenText");
upperText.textContent=upperDisplay;
const currentText = document.querySelector("#currentText");
currentText.textContent=currentDisplay;

let first=0;
let second=undefined;
let op= "";
function clear(){
    upperDisplay="";
    currentDisplay="0";
    first=0;
    second=undefined;;
    op= "";
    currentText.textContent= currentDisplay;
    upperText.textContent= upperDisplay;
}
function deleteOne(){
    if(currentText.textContent.length === 1){
        currentDisplay="0";
        currentText.textContent="0";
        first=0;
    }else{
        currentText.textContent= currentText.textContent.substring(0, currentText.textContent.length-1);
        first=parseFloat(currentText.textContent,10);
    }
}

const numbers= document.querySelectorAll(".number");
numbers.forEach(function(number){
    number.addEventListener("click", () => {
        currentDisplay = number.getAttribute("value");
        if(currentText.textContent.includes(".")){
            currentText.textContent = currentText.textContent + currentDisplay.toString();
            first = parseFloat(currentText.textContent,10);
        }else{
            first= parseFloat(currentText.textContent + currentDisplay.toString(),10);
            currentText.textContent= first;
        }});
});

const operators=document.querySelectorAll(".operation");
operators.forEach(function(operator){
    operator.addEventListener("click", () => update(operator.getAttribute("value")));
});
function update(operator){
    op=operator;
    if( op === "AC"){
        clear();
    }else if( op === "C"){
        deleteOne();
    }else if( op === "."){
        if(Number.isInteger(first)){
            currentText.textContent= first + ".";
            first= parseFloat(currentText.textContent,10);
        }
    }else if ( op === "="){
        if(upperDisplay !== "" && isNaN(upperText.textContent)){
            upperDisplay = operation(second,first,upperText.textContent[upperText.textContent.length-1]);
            upperText.textContent = upperDisplay + " ";
            currentText.textContent= upperDisplay;
            first=upperDisplay;
            second=upperDisplay;
        }else{
            return;
        }
    }else{

        if(upperDisplay ===""){
            upperDisplay = currentDisplay;
            upperText.textContent = currentText.textContent + op;
            currentText.textContent="0";
            second=first;
            first=0;
        }else{
            upperText.textContent = upperText.textContent.slice(0,upperText.textContent.length-1) + op;
        }
    }

}

/* otan exei upperdisplay tote bazw to second
    otan mpei to second stelnw sto current to apotelesma

*/