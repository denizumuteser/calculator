//to-do
//add decimal support
//add digit limit

let lowertext = document.querySelector("#lower-text");
let uppertext = document.querySelector("#upper-text");
let currentOperator = "";
let isOperatorPressed = false;
let lastpressedOperator = false;

let firstNumber = "";
let secondNumber = "";

//math operators
function add(a,b){return Number(a)+Number(b);}
function subtract(a,b){return a-b;}
function multiply(a,b){return a*b;}
function divide(a,b){return a/b;}

//evaluate oepration type
function operate(a, o ,b)
{
    switch (o) {
        case "+":
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "*":
            return multiply(a,b);
        case "/":
            return divide(a,b);
        default:
            return null;
    }
}

function writeUpperScreen(string)
{
    
    uppertext.textContent = string;
}

function writeLowerScreen(string)
{
    lowertext.textContent = string;
}

function clearScreen()
{
    lowertext.textContent = "0";
    uppertext.textContent = "";
    currentOperator = "";
    firstNumber = "";
    secondNumber = "";
    isOperatorPressed = false;
    lastpressedOperator = false;
}

function undo()
{
    let temp = lowertext.textContent;
    temp = temp.slice(0,temp.length-1)
    if (temp == "")
    {
        temp = "0";
    }
    lowertext.textContent = temp;
    if (isOperatorPressed) {
        secondNumber = temp;
    }
    else
    {
        firstNumber = temp;
    }
}

document.addEventListener('keydown', (e) => {
    //console.log(e.key);
    switch (e.key) {
        case "1":
            return handleNumber(1);
        case "2":
            return handleNumber(2);
        case "3":
            return handleNumber(3);
        case "4":
            return handleNumber(4);
        case "5":
            return handleNumber(5);
        case "6":
            return handleNumber(6);
        case "7":
            return handleNumber(7);
        case "8":
            return handleNumber(8);
        case "9":
            return handleNumber(9);
        case "0":
            return handleNumber(0);
        case "Backspace":
            return undo();
        case "Delete":
            return clearScreen();
        case "+":
            return handleOperator("+");
        case "-":
            return handleOperator("-");
        case "/":
            return handleOperator("/");
        case "*":
            return handleOperator("*");
        case "Enter":
            return equals();
        default:
            return;
    }
})

//backspace
const btn_backspace = document.querySelector('#btn_backspace')
btn_backspace.addEventListener('click', () => {
    undo();
});
//clear
const btn_clear = document.querySelector('#btn_ac')
btn_clear.addEventListener('click', () => {
    clearScreen();
});
//divide
const btn_divide = document.querySelector('#btn_divide')
btn_divide.addEventListener('click', () => {
    handleOperator("/");
});
//7
const btn_seven = document.querySelector('#btn_seven')
btn_seven.addEventListener('click', () => {
    handleNumber("7");
});
//8
const btn_eight = document.querySelector('#btn_eight')
btn_eight.addEventListener('click', () => {
    handleNumber("8");
});
//9
const btn_nine = document.querySelector('#btn_nine')
btn_nine.addEventListener('click', () => {
    handleNumber("9");
});
//multiply
const btn_multiply = document.querySelector('#btn_multiply')
btn_multiply.addEventListener('click', () => {
    handleOperator("*");
});
//4
const btn_four = document.querySelector('#btn_four')
btn_four.addEventListener('click', () => {
    handleNumber("4");
});
//5
const btn_five = document.querySelector('#btn_five')
btn_five.addEventListener('click', () => {
    handleNumber("5");
});
//6
const btn_six = document.querySelector('#btn_six')
btn_six.addEventListener('click', () => {
    handleNumber("6");
});
//subtract
const btn_subtract = document.querySelector('#btn_subtract')
btn_subtract.addEventListener('click', () => {
    handleOperator("-");
});
//1
const btn_one = document.querySelector('#btn_one')
btn_one.addEventListener('click', () => {
    handleNumber("1");
});
//2
const btn_two = document.querySelector('#btn_two')
btn_two.addEventListener('click', () => {
    handleNumber("2");
});
//3
const btn_three = document.querySelector('#btn_three')
btn_three.addEventListener('click', () => {
    handleNumber("3");
});
//sum
const btn_sum = document.querySelector('#btn_sum')
btn_sum.addEventListener('click', () => {
    handleOperator("+");
});
//zero
const btn_zero = document.querySelector('#btn_zero')
btn_zero.addEventListener('click', () => {
    handleNumber("0");
});
//decimal
const btn_decimal = document.querySelector('#btn_decimal')
btn_decimal.addEventListener('click', () => {
    alert("not implemented yet")
    //console.log(firstNumber+","+ currentOperator + "," +secondNumber)
});
//equal
const btn_equal = document.querySelector('#btn_equal')
btn_equal.addEventListener('click', () => {
    equals();
});

function handleNumber(num)
{
    //storing last 2 numbers
    if (!isOperatorPressed) {
        firstNumber += num;
    }
    else
    {
        secondNumber += num;
    }
    if (lowertext.textContent == "0") {
        lowertext.textContent = num;
    }    
    else if (firstNumber=="" || lastpressedOperator==true) {
        writeLowerScreen(num);
    }
    else
    {
        writeLowerScreen(lowertext.textContent+num);
    }
    lastpressedOperator = false;
}

function handleOperator(op)
{   
    if (firstNumber == "" && op!="-") {
        return;
    }
    else if (firstNumber == "" && op == "-") {
        firstNumber="-";
        return;
    }
    else if (secondNumber == "" && op == "-" && currentOperator != "") {
        secondNumber="-";
        return;
    }

    if (firstNumber!="" && secondNumber =="" && currentOperator != "") {
        currentOperator = op;
        //change current operator
        writeUpperScreen(uppertext.textContent.slice(0,uppertext.textContent.length-1) +currentOperator);
        return;
    }

    let temp = currentOperator;
    currentOperator = op;
    if (secondNumber != "") {
        equalsWithMore(temp)
    }
    else
    {
        writeUpperScreen(firstNumber + " "+currentOperator);

        if (isOperatorPressed) {
            isOperatorPressed = false;
        }
        else
        {
            isOperatorPressed = true;
        }
    }
    lastpressedOperator = true;    
}

function equalsWithMore(op)
{
    let final = operate(firstNumber,op,secondNumber);
    writeUpperScreen(final + " " + currentOperator);
    writeLowerScreen(final);
    firstNumber = final;
    secondNumber = "";
    isOperatorPressed = true;
}

function equals()
{
    if (firstNumber == "" || secondNumber == "") {
        return;
    }
    console.log(secondNumber, currentOperator)
    if (secondNumber == "0" && currentOperator == "/") {
        alert("You can not divide by 0!");
        clearScreen();
        return;
    }
    //find expression
    writeUpperScreen(firstNumber + " " + currentOperator + " " + secondNumber + " =");
    let final = operate(firstNumber,currentOperator,secondNumber);
    final = Math.round(final*100000000000)/100000000000
    writeLowerScreen(final);
    firstNumber = final;
    secondNumber = "";
    isOperatorPressed=false;
    currentOperator = ""
}
