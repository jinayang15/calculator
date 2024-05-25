function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (b == 0) return NaN;
    return a / b;
}

function operate(a, operator = "=", b = a) {
    a = +a;
    b = +b;
    switch (operator) {
        case "+":
            return add(a, b);
            break;
        case "-":
            return subtract(a, b);
            break;
        case "×":
            return multiply(a, b);
            break;
        case "÷":
            return divide(a, b);
            break;
        case "=":
            return a;
    }
}

function convertToScientificNotation(num, digitLimit) {
    let result = "";
    let exp = 0;
    let numDigitsExp;
    if (num >= 1) {
        while (num / 10 > 1) {
            exp++;
            num /= 10;
        }
    }
    else {
        while (num * 10 < 10) {
            exp--;
            num *= 10;
        }
    }
    numDigitsExp = String(exp).length;
    num = roundResult(num, digitLimit - numDigitsExp - 3);
    result = String(num) + "e" + String(exp);
    return result;
}

function roundResult(num, digitLimit) {
    return Math.round(num * Math.pow(10, digitLimit)) / Math.pow(10, digitLimit);
}

function calculateResult(expressionArr, digitLimit) {
    let result = operate(...expressionArr);
    // round number to prevent overflow
    if (String(result).length > digitLimit) {
        result = convertToScientificNotation(result, digitLimit);
    } else {
        result = roundResult(result, digitLimit-1);
    }
    return String(result);
}

function onNumClick(button, operatorSelected, decimalSelected, expression, display, digitLimit) {
    const expressionArr = String(expression).match(/(\d+(\.\d+)?e(-)?(\d+))|(\.\d+)|(\d+(\.\d+)?)|[\+-×÷]/g);
    // displays the new number after operator has been clicked
    if (operatorSelected) {
        expression += button.textContent;
        display.textContent = button.textContent;
        operatorSelected = false;
    }
    else if (button.id == "decimal") {
        if (!decimalSelected) {
            expression += button.textContent;
            display.textContent += button.textContent;
        }
    }
    // replaces the number on the display with the next number click if the current expression is 0
    else if (expressionArr[expressionArr.length-1] == "0") {
        expression = button.textContent;
        display.textContent = button.textContent;
    }
    else if (expressionArr.at(-1).length < digitLimit) {
        expression += button.textContent;
        display.textContent += button.textContent;
    }
    return {
        expression: expression,
        operatorSelected: operatorSelected,
    }
}

function onOperatorClick(button, operatorSelected, decimalSelected, expression, display, digitLimit) {
    // regex to split string into numbers and operators
    const expressionArr = String(expression).match(/(\d+(\.\d+)?e(-)?(\d+))|(\.\d+)|(\d+(\.)?(\d+)?)|[\+-×÷]/g);
    switch (button.id) {
        case "equal":
            const result = calculateResult(expressionArr, digitLimit);
            expression = result;
            display.textContent = result;
            operatorSelected = false;
            break;
        case "clear":
            expression = "0";
            display.textContent = "0";
            operatorSelected = false;
            break;
        case "percentage":
            if (!operatorSelected) {
                const lastNumber = Number(expressionArr[expressionArr.length - 1]);
                const percent = calculateResult([lastNumber, "×", "0.01"], digitLimit);
                expressionArr[expressionArr.length - 1] = percent;
                display.textContent = percent;
                expression = expressionArr.join("");
                break;
            }
        case "backspace":
            if (!operatorSelected) {
                const lastNumber = expressionArr[expressionArr.length - 1];
                if (lastNumber.length > 1) {
                    expressionArr[expressionArr.length-1] = lastNumber.slice(0, -1);
                }
                else {
                    expressionArr[expressionArr.length-1] = "0"
                }
                expression = expressionArr.join("");
                display.textContent = expressionArr[expressionArr.length-1];
            }
            break;
        case "divide":
        case "multiply":
        case "plus":
        case "minus":
            // replaces previous operator when another is clicked
            if (operatorSelected) {
                expression = expression.slice(0, -1) + button.textContent;
            }
            // evaluate the result before continuing other operations even if equal sign is not clicked
            else if (expressionArr.length == 3) {
                const result = calculateResult(expressionArr);
                expression = result + button.textContent;
                display.textContent = result;
                operatorSelected = true;
            }
            else {
                expression += button.textContent;
                operatorSelected = true;
            }
    }
    return {
        expression: expression,
        operatorSelected: operatorSelected,
    }
}

function main() {
    const display = document.querySelector(".display");
    const buttons = document.querySelectorAll(".button");
    // number of digits that can be displayed on the calculator accounting for the decimal point
    const digitLimit = 11;
    let operatorSelected = false;
    let decimalSelected = false;
    let expression = "0";

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            let returned;
            // do not allow for operations once an error occurs but allow the user to clear
            if (expression != "NaN" || button.id == "clear") {
                if (button.classList.contains("num")) {
                    returned = onNumClick(button, operatorSelected, decimalSelected, expression, display, digitLimit);
                }
                else if (button.classList.contains("operator")) {
                    returned = onOperatorClick(button, operatorSelected, decimalSelected, expression, display, digitLimit);
                }
                expression = returned.expression;
                operatorSelected = returned.operatorSelected;
                decimalSelected = display.textContent.includes(".");
            }
        });
    });
}

main()