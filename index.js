
const calculate =
{
    add: (a,b) => a + b,
    subtract: (a,b) => a-b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,

    calculate(a,b, operator){
                return calculate[operator](a,b);
        }

};

var displayValue = "";
console.log(calculate.calculate(6,2,"multiply"));

//check string for Special chars
function containsSpecialChars(str) {

    const specialChars = ["+", "-", "/", "*"];
    const operations = ["add", "subtract", "divide", "multiply"]
    let toDo = []

    for  (let possibleOp in  str){
        for (let oper in specialChars) {
            if (specialChars[oper] == str[possibleOp]) {
                toDo.push(operations[oper])}
            };};
    return toDo;
    }



function splitValue(str) {
    let theNumbers = []
    let negativeNum = false
    if (str[0] == "-") {
        negativeNum = true;
    }
    var Numbers = str.split(/[*\-+\/]/)
    for (number in Numbers) {
        theNumbers.push(Numbers[number]);
    }
    if (negativeNum == true) {
        theNumbers[0] = theNumbers[0] - (theNumbers[0] * 2);
    }
    return theNumbers;
    }

function istPunkt(operator) {
    if ((operator == "multiply") | (operator== "divide")) {
        return true;
    }
}

function filterFunction(myArray, toRemove) {

    myArray = myArray.filter( function( el ) {
        return toRemove.indexOf( el ) < 0;
    } );
    return myArray;
}

function calculateAll(numbers, toDo) {
    var indexToRemove = [];
    for (i = 0; i < toDo.length; i++) {
        if (istPunkt(toDo[i])) {
            let result = calculate.calculate(numbers[i], numbers[i+1] , toDo[i]);
            numbers[i+1] = result;
            indexToRemove.push(i); }}

    //removenumber
    var toRemove = []
    for(let j = 0; j < indexToRemove.length ; j++) {
        toRemove.push(numbers[indexToRemove[j]])
    }
    numbers = filterFunction(numbers, toRemove);

    let Removeable = ["multiply", "divide"];
    toDo = filterFunction(toDo, Removeable);
    for (i = 0; i < toDo.length; i++) {
        let result = calculate.calculate(numbers[i], numbers[i+1] , toDo[i]);
        numbers[i+1] = result;
    }
    return numbers[numbers.length - 1];



}



function calculateResults(str) {
    let numbers = splitValue(str);
    let toDo = containsSpecialChars(str);
    //parse all Num
    for (i = 0; i < numbers.length; i++) {
        numbers[i] = parseFloat(numbers[i]);
    }
    result = calculateAll(numbers, toDo)


    if (isNaN(result)) {
        return;
    }
    if (result % 1 != 0) {
        result = result.toFixed(2);
    };

    console.log(result);
    TextElement = document.getElementsByClassName("screen");
    TextElement[0].textContent=result;
    displayValue = result;
    disableNumfield();

}

//split displayvalue by specialchar
//get specialchar
//pass operator based on specialChar
function disableNumfield() {
    var Numbers = document.querySelectorAll(".buttons > button");
    Numbers.forEach (numberr => {numberr.classList.add("disabled")});
}
function deactivateButtons(button)
{
    //if operator
    if(containsOperator(button)){
        var numbers = document.querySelectorAll(".operators > button , button[id='='] ");
        numbers.forEach(number => {number.classList.add("disabled")});

        var Numbers = document.querySelectorAll(".buttons > button");
        Numbers.forEach (numberr => {numberr.classList.remove("disabled")});
    }
    if(button == "/") {
        var zero = document.getElementById("zero");
        zero.classList.add("disabled");
    }
    if(containsNumber(button)) {
        var numbers = document.querySelectorAll(".operators > button , button[id='='], button[id='zero']");
        numbers.forEach(number => {number.classList.remove("disabled")});
    }
}
//get buttons
function updateScreen(Textinput) {
    //alert("updateScreen");
    console.log(Textinput);
    if (displayValue.length > 12) {
        return;
    }
    TextElement = document.getElementsByClassName("screen");

    var input = "";
    if (Textinput.textContent != undefined)
        {    if (Textinput.classList.contains("disabled")) {
            return;}
            input = Textinput.textContent;
        }
    else
        {

            input = Textinput;
        }

    deactivateButtons(input);
    displayValue += input;

    TextElement[0].textContent=displayValue;

};

function containsOperator(button) {
    substring = ["+", "-", "/", "*"]
    for (oper in substring) {
        if (button == substring[oper]){
            return true;
        }}}

function containsNumber(button) {
    substring = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    for (oper in substring) {
        if (button == substring[oper]){
            return true;
        }}}
var Buttons = document.querySelectorAll("div.buttons > button:not([id='=']), div.operators > button ");
console.log(Buttons);
text = document.querySelector(".screen");
var Equals = document.getElementById("=");

function emptyDisplay() {
    TextElement = document.getElementsByClassName("screen");
    displayValue = "";
    TextElement[0].textContent=displayValue;
    var Buttons = document.querySelectorAll("div.operators > button:not([class='-'])");
    Buttons.forEach(number => {number.classList.add("disabled")});
}

function removeLast() {
    TextElement = document.getElementsByClassName("screen");
    displayValue = displayValue.slice(0, -1);
    TextElement[0].textContent=displayValue;
    deactivateButtons(displayValue[displayValue.length - 1])
}

Equals.addEventListener('click', () => { calculateResults(displayValue)});

Buttons.forEach((element => element.addEventListener('click', function (e) { updateScreen(e.target)
capture: true})));



document.addEventListener("keydown", function (e) {keyboardInput(e.key)});
function keyboardInput(key)
{
    if ((key == "=") | (key == "Enter")) {
        calculateResults(displayValue);
        return;
    }
    if (key == "Backspace") {
        removeLast();
    }
    if (key == "Escape") {
        emptyDisplay();
    }
    element = document.getElementsByClassName(key);

    //if (element.classlist.contains("disabled")){return;}
    updateScreen(element[0]);
}

//Empty display after clicking C
var Return = document.querySelector(".return")
Return.addEventListener('click', () => { emptyDisplay()
})
