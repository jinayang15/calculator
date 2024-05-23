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

function calculateResult(expressionArr) {
    // number of digits that can be displayed on the calculator accounting for the decimal point
    const digitLimit = 11; 
    // round number to prevent overflow
    const result = Math.round(operate(...expressionArr) * Math.pow(10, digitLimit - 1)) / Math.pow(10, digitLimit - 1);
    return String(result);
}

function onNumClick(button, operatorSelected, expression, display) {
    // replaces the number on the display with the next number click if the current expression is 0
    if (expression == "0" && button.id != "decimal") {
        expression = button.textContent;
        display.textContent = button.textContent;
    }
    // displays the new number after operator has been clicked
    else if (operatorSelected) {
        expression += button.textContent;
        display.textContent = button.textContent;
        operatorSelected = false;
    }
    else {
        expression += button.textContent;
        display.textContent += button.textContent;
    }
    return {
        expression: expression,
        operatorSelected: operatorSelected
    }
}

function onOperatorClick(button, operatorSelected, expression, display) {
    // regex to split string into numbers and operators
    const expressionArr = String(expression).match(/(\.\d+)|(\d+(\.\d+)?)|[\+-×÷]/g);
    switch (button.id) {
        case "equal":
            const result = calculateResult(expressionArr);
            expression = result;
            display.textContent = result;
            operatorSelected = false;
            break;
        case "clear":
            expression = "0";
            display.textContent = "0";
            operatorSelected = false;
            break;
        case "divide":
        case "multiply":
        case "plus":
        case "minus":
            // replaces previous operator when another is clicked
            if (operatorSelected) {
                expression = expression.slice(0,-1) + button.textContent;   
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
            break;
    }
    return {
        expression: expression,
        operatorSelected: operatorSelected
    }
}

function main() {
    const display = document.querySelector(".display");
    const buttons = document.querySelectorAll(".button");
    let operatorSelected = false;
    let expression = "0";

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            let returned;
            // do not allow for operations once an error occurs but allow the user to clear
            if (expression != "NaN" || button.id == "clear") {
                if (button.classList.contains("num")) {
                    returned = onNumClick(button, operatorSelected, expression, display);
                }
                else if (button.classList.contains("operator")) {
                    returned = onOperatorClick(button, operatorSelected, expression, display);
                }
                expression = returned.expression;
                operatorSelected = returned.operatorSelected;
            }
        });
    });
}

main()