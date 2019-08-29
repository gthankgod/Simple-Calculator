
const numbers = document.querySelectorAll('.numbers');
const operations = document.querySelectorAll('.operations');
const clearField = document.querySelector('#clear');
const clearOne = document.querySelector('#clearone');

let inputResult = document.querySelector('#inputResult');
let result = document.querySelector('#result');
let displayResult = false;

// adding click handlers to number buttons
numbers.forEach(number => {
    number.addEventListener('click', (e) => {

        let presentValue = inputResult.textContent;
        let lastCharacter = presentValue[presentValue.length - 1];

        if (displayResult === false) {
            inputResult.textContent += e.target.textContent;
        } else if (displayResult === true && lastCharacter === "+" || lastCharacter === "-" || lastCharacter === "×" || lastCharacter === "÷" || lastCharacter === "%" || lastCharacter === "^") {
            displayResult = false;
            inputResult.textContent += e.target.textContent;
        } else {
            displayResult = false;
            inputResult.textContent = "";
            inputResult.textContent += e.target.textContent;
        }
    });
});

operations.forEach(operation => {
    operation.addEventListener('click', (e) => {
        let presentValue = inputResult.textContent;
        let lastCharacter = presentValue[presentValue.length - 1];

        if (lastCharacter === "+" || lastCharacter === "-" || lastCharacter === "×" || lastCharacter === "÷" || lastCharacter === "%" || lastCharacter === "^") {
            let newString = presentValue.splice(0, presentValue.length - 1) + e.target.textContent;
            inputResult.textContent = newString;
        } else if (presentValue.length === 0) {
            inputResult.textContent = 0;
        } else {
            inputResult.textContent += e.target.textContent;
        }

    });
});

result.addEventListener("click", function () {

    let inputString = inputResult.textContent;
    let numbers = inputString.split(/\+|\-|\×|\÷|\%|\^/g);

    let operations = inputString.replace(/[0-9]|\./g, "").split("");

    let divide = operations.indexOf("÷");
    if (divide !== -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operations.splice(divide, 1);
        divide = operations.indexOf("÷");
    }



    let multiply = operations.indexOf("×");
    if (multiply !== -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operations.splice(multiply, 1);
        multiply = operations.indexOf("×");
    }

    let modulus = operations.indexOf("%");
    if (modulus !== -1) {
        numbers.splice(modulus, 2, numbers[modulus] % numbers[modulus + 1]);
        operations.splice(modulus, 1);
        modulus = operations.indexOf("×");
    }

    let subtract = operations.indexOf("-");
    if (subtract !== -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operations.splice(subtract, 1);
        subtract = operations.indexOf("-");
    }

    let add = operations.indexOf("+");
    if (add !== -1) {
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operations.splice(add, 1);
        add = operations.indexOf("+");
    }

    let raiseTopower = operations.indexOf("^");
    if (raiseTopower !== -1) {
        numbers.splice(raiseTopower, 2, parseFloat(numbers[raiseTopower]) ** parseFloat(numbers[raiseTopower + 1]));
        operations.splice(raiseTopower, 1);
        raiseTopower = operations.indexOf("^");
    }


    inputResult.textContent = numbers[0];

    displayResult = true;
});

// clearing the input on press of clear
clearField.addEventListener("click", function () {
    inputResult.textContent = "";
});

clearOne.addEventListener("click", () => {
    let arr = inputResult.textContent;
    let arr2 = arr.replace(/CE/g, '');
    let arr3 = arr2.split("").splice(0, arr2.length - 2).join("");
    inputResult.textContent = arr3;
});