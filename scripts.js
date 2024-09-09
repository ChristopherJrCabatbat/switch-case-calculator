const display = document.getElementById('display');
let currentInput = '';
let operator = '';
let firstOperand = '';
let secondOperand = '';
let fullExpression = '';

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const value = this.getAttribute('data-value');

        if (display.value === 'Error') {
            clearCalculator();
        }

        switch(value) {
            case 'C':
                clearCalculator();
                break;
            case '=':
                calculateResult();
                break;
            case '+':
            case '-':
            case '*':
            case '/':
                setOperator(value);
                break;
            case '.':
                appendDecimal();
                break;
            case '←':
                backspace();
                break;
            default:
                appendNumber(value);
                break;
        }
    });
});

function clearCalculator() {
    currentInput = '';
    operator = '';
    firstOperand = '';
    secondOperand = '';
    fullExpression = '';
    display.value = '';
}

function calculateResult() {
    if (operator && firstOperand !== '' && currentInput !== '') {
        secondOperand = currentInput;
        let result;
        switch(operator) {
            case '+':
                result = parseFloat(firstOperand) + parseFloat(secondOperand);
                break;
            case '-':
                result = parseFloat(firstOperand) - parseFloat(secondOperand);
                break;
            case '*':
                result = parseFloat(firstOperand) * parseFloat(secondOperand);
                break;
            case '/':
                if (parseFloat(secondOperand) === 0) {
                    displayError();
                    return;
                }
                result = parseFloat(firstOperand) / parseFloat(secondOperand);
                break;
        }
        display.value = result; // Display the result only
        currentInput = result.toString();
        operator = '';
        firstOperand = '';
        secondOperand = '';
        fullExpression = currentInput; // Reset fullExpression for continued operations
    }
}

function setOperator(op) {
    if (currentInput !== '') {
        if (firstOperand === '') {
            firstOperand = currentInput;
            operator = op;
            currentInput = '';
            fullExpression = `${firstOperand} ${operator} `; // Add a space after the operator
        } else {
            calculateResult();
            operator = op;
            fullExpression = `${fullExpression} ${operator} `;
        }
        display.value = fullExpression;
    }
}

function appendNumber(number) {
    currentInput += number;
    fullExpression += number;
    display.value = fullExpression;
}

function appendDecimal() {
    if (!currentInput.includes('.')) { // Prevent multiple decimals in a number
        currentInput += '.';
        fullExpression += '.';
        display.value = fullExpression;
    }
}

function backspace() {
    if (currentInput !== '') {
        currentInput = currentInput.slice(0, -1);
        fullExpression = fullExpression.slice(0, -1);
        display.value = fullExpression;
    }
}

function displayError() {
    display.value = 'Error';
    currentInput = '';
    operator = '';
    firstOperand = '';
    secondOperand = '';
    fullExpression = '';
}