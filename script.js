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
        setUpCurrent("0");
    }else{
        setUpCurrent(currentText.textContent.substring(0, currentText.textContent.length-1));
        
    }
}
function setUpCurrent(display){
    //console.log(display);
    const fixed= fixOverFlows(display);
    if(display.includes(".")){
        currentText.textContent= fixed;
        first=parseFloat(fixed,10);
    }else{
        first=parseFloat(fixed,10);
        currentText.textContent= first;
    }
}
function fixOverFlows(display){
    if(display.length> 9){
        const [beforeComma,afterComma] = display.split(".");
        //console.log(display);
        if(afterComma === undefined){
            return Number.parseFloat(display).toExponential("4");//scientific thing
        }else if(afterComma.length > 4){
            return parseFloat(display,10).toFixed(2);   // too many after comma
        }
    }
    return display;
}

const numbers= document.querySelectorAll(".number");
numbers.forEach(function(number){
    number.addEventListener("click", () => {
        currentDisplay = number.getAttribute("value");
        setUpCurrent(currentText.textContent + currentDisplay.toString());
        });
});

const operators=document.querySelectorAll(".operation");
operators.forEach(function(operator){
    operator.addEventListener("click", () => update(operator));
});
function update(operator){
    op=operator.getAttribute("value");
    if( op === "AC"){
        clear();
        const divideOperator = document.querySelector("#divide");
        divideOperator.classList.remove("broken");
    }else if( op === "C"){
        deleteOne();
    }else if( op === "."){
        if(Number.isInteger(first)){
            setUpCurrent(first + ".");
        }
    }else if ( op === "="){
        if(upperDisplay !== "" && isNaN(upperText.textContent)){
            const lastOp=upperText.textContent[upperText.textContent.length-1];
            if(first === 0 && lastOp ==="/"){
                alert("Dont divide by zero you broke it,Use AC to fix it");
                clear();
                const divideOperator = document.querySelector("#divide");
                divideOperator.classList.add("broken");
                return;
            }

            upperDisplay = operation(second,first,lastOp);
            upperText.textContent = fixOverFlows(upperDisplay.toString()) + " ";
            
            setUpCurrent(upperDisplay.toString());
            second=upperDisplay;
        }else{
            return;
        }
    }else{
        if(upperDisplay ===""){
            upperDisplay = fixOverFlows(currentDisplay.toString());
            upperText.textContent = fixOverFlows(currentText.textContent.toString()) + op;
            second=first;
            setUpCurrent("0");
        }else{
            upperText.textContent = upperText.textContent.slice(0,upperText.textContent.length-1) + op;
        }
    }

}
