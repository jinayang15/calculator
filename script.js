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

function operate(a, operator="=", b = a) {
    a = +a;
    b = +b;
    switch (operator) {
        case "+":
            return add(a,b);
            break;
        case "-":
            return subtract(a,b);
            break;
        case "×":
            return multiply(a,b);
            break;
        case "÷":
            return divide(a,b);
            break;
        case "=":
            return a;
    }   
}

function addButtonEventListener(buttons) {
    
}

function main() {
    const display = document.querySelector(".display");
    const buttons = document.querySelectorAll(".button");
    let operatorSelected = false;
    let expression = "0";
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const buttonClassList = button.classList;
            if (buttonClassList.contains("num")) {
                if (expression == "0" && button.id != "decimal") {
                    expression = button.textContent;
                    display.textContent = button.textContent;
                }
                else if (operatorSelected) {
                    expression += button.textContent;
                    display.textContent = button.textContent;
                    operatorSelected = false;
                }
                else {
                    expression += button.textContent;
                    display.textContent += button.textContent;
                }
            }
            else if (buttonClassList.contains("operator")) {
                switch (button.id) {
                    case "equal":
                        const expressionArr = expression.match(/(\d+|\+|-|×|÷)/g);
                        alert(expressionArr);
                        const result = operate(...expressionArr);
                        alert(result);
                        expression = result;
                        display.textContent = result;
                        break;
                    case "clear":
                        expression = "0";
                        display.textContent = "0";
                        break;
                    case "divide":
                    case "multiply":    
                    case "plus":
                    case "minus":
                        operatorSelected = true;
                        expression += button.textContent;
                        break;
                }
            }
        });
    });
}

main()