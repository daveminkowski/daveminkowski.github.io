/*  
Dave Minkowski
9/17/2018
CIS 166AA Section 23047
Basic Calculation Script
*/

// error message to display when a number field is empty
var errMsg = "Please enter a value for both fields"
	
/*addition function*/
function add() {
var num1 = parseInt(document.getElementById("num1").value);
var num2 = parseInt(document.getElementById("num2").value);
var result = (num1+num2);
    if (num1 && num2) {
        document.getElementById("result").innerHTML = result;
    } else {
        document.getElementById("result").innerHTML = errMsg;
    }
}				
document.getElementById("btnAdd").addEventListener("click", add, false);

//subtraction function
function subtract() {
var num1 = parseInt(document.getElementById("num1").value);
var num2 = parseInt(document.getElementById("num2").value);
var result = (num1-num2);
    if (num1 && num2) {
        document.getElementById("result").innerHTML = result;
    } else {
        document.getElementById("result").innerHTML = errMsg;
    }
}							
document.getElementById("btnSubtract").addEventListener("click", subtract, false);

//multiplication function
function multiply() {
var num1 = parseInt(document.getElementById("num1").value);
var num2 = parseInt(document.getElementById("num2").value);
var result = (num1*num2);
    if (num1 && num2) {
        document.getElementById("result").innerHTML = result;
    } else {
        document.getElementById("result").innerHTML = errMsg;
    }
}							
document.getElementById("btnMultiply").addEventListener("click", multiply, false);

//division function
function divide() {
var num1 = parseInt(document.getElementById("num1").value);
var num2 = parseInt(document.getElementById("num2").value);
var result = (num1/num2);
    if (num1 && num2) {
        document.getElementById("result").innerHTML = result;
    } else {
        document.getElementById("result").innerHTML = errMsg;
    }
}							
document.getElementById("btnDivide").addEventListener("click", divide, false);

//single calculator function using selector for operation
function calc() {
var number1 = parseInt(document.getElementById("number1").value);
var number2 = parseInt(document.getElementById("number2").value);
var operator = document.getElementById("operators").value;
var calcResult = 0;
    
    if (number1 && number2) {
        if (operator == "+") {
            calcResult = (number1+number2);
            document.getElementById("result2").innerHTML = calcResult;
        }
        else if (operator == "-") {
            calcResult = (number1-number2);
            document.getElementById("result2").innerHTML = calcResult;
        }
        else if (operator == "*") {
            calcResult = (number1*number2);
            document.getElementById("result2").innerHTML = calcResult;
        }
        else if (operator == "/") {
            calcResult = (number1/number2);
            document.getElementById("result2").innerHTML = calcResult;
        }
    } else {
        document.getElementById("result2").innerHTML = errMsg;
    }
}							
document.getElementById("btnCalc").addEventListener("click", calc, false);