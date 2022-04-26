// To DO
// - Clean up naming (particularly 'result')
// - Add modulo support
// - Round decimal answers
// - Make it look nice
// - Keyboard support
// - Display what the user has done?
// -Evaluate when the user has only selected num1 and an operator


const display = document.querySelector('.display')
const numberButtons = document.querySelectorAll('.btn-number')
const operatorButtons = document.querySelectorAll('.btn-operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const decButton = document.getElementById('decimal');
const bspButton = document.getElementById('delete');

display.textContent = 0;

let expression = {
    op: undefined,
    num1: '',
    num2: '',
    isResult: false
}

// Number listeners
for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', (e) => {
        numberLogic(e);
    })
}

// Operator listeners
for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', (e) => {
        if (expression.isResult) {
            expression.isResult = false;
        }
        if (expression.num1.length > 0 && expression.num2.length > 0 && expression.op) {
            operate(expression.op, Number(expression.num1), Number(expression.num2));
            expression.isResult = false;
            displayUpdate(expression.num1);
        }
        expression.op = (e.target.id); 
    })
}

// Backspace listener
bspButton.addEventListener('click', () => {
    if(expression.num1.length > 0 && !expression.op) {
        expression.num1 = expression.num1.slice(0,-1);
        displayUpdate(expression.num1);

    }
    if(expression.num1.length > 0 && expression.op) {
        expression.num2 = expression.num2.slice(0, -1);
        displayUpdate(expression.num2);
    }
})


// Decimal listener
decButton.addEventListener('click', () => {
    if(!expression.op) {
        if(expression.num1.includes('.')) {
        return;
        }
        expression.num1 += '.'
        displayUpdate(expression.num1)
    } else {
        if(expression.num2.includes('.')) {
        return;
    }
        expression.num2 += '.'
        displayUpdate(expression.num2)
    }
})

// Equals listener
equalsButton.addEventListener('click', () => {
    if (expression.op) {
        operate(expression.op, Number(expression.num1), Number(expression.num2));
        displayUpdate(expression.num1);
    }
})

// Clear listener
clearButton.addEventListener('click', () => clear());

function numberLogic(obj) {
    let number = obj.target.textContent;
     // num1

    if (expression.isResult) {
        console.log('Clearing result for new input');
        clear();
        expression.num1 = number;
        displayUpdate(expression.num1);

    } else {
            if (expression.num1.length > 0 && !expression.op && expression.num2.length == 0) {
                    let update = expression.num1 += number;
                    displayUpdate(update)
                    return update;
                }
                // num1, op
                if (expression.num1.length > 0 && expression.op && expression.num2.length == 0) {
                    console.log('hi');
                    displayUpdate(number);
                    return expression.num2 = number;
                }
                // num1, num2, op
                if (expression.num1.length > 0 && expression.op && expression.num2.length > 0) {
                    let update = expression.num2 += number;
                    displayUpdate(update);
                    return update;
                }
                // empty (base)
                if (expression.num1.length == 0 && expression.num2.length == 0) {
                    displayUpdate(number);
                    return expression.num1 = number;
                }
        }
};

function operate(operator, num1, num2) {
    switch (operator) {
        case 'sum':
                expression.num1 = sum(num1, num2).toString();
                expression.num2 = '';
                expression.op = undefined;
                expression.isResult = true;
                break;
        case 'subtract':
                expression.num1 = subtract(num1, num2).toString();
                expression.num2 = '';
                expression.op = undefined;
                expression.isResult = true;
                break;
        case 'multiply':
                expression.num1 = multiply(num1, num2).toString();
                expression.num2 = '';
                expression.op = undefined;
                expression.isResult = true;
                break;
        case 'divide':
                expression.num1 = divide(num1, num2).toString();
                expression.num2 = '';
                expression.op = undefined;
                expression.isResult = true;
                break;
    }
}

function displayUpdate(num) {
    display.textContent = num;
}

function clear() {
    expression.op = undefined;
    expression.num1 = '';
    expression.num2 = '';
    expression.isResult = false;
    displayUpdate(0);
}

// Operator functions
const sum = (...nums) => {
    console.log(nums);
    return nums.reduce( (total, current) => total + current, 0)
}

const subtract = (...nums) => {
    return nums[0] - nums[1];
}

const multiply = (...nums) => {
    return nums.length
    ? nums.reduce( (total, current) => total * current)
    : 0;
}

const divide = (...nums) => {
    if (nums[1] == 0) {
        alert('You tried to break me. Resetting...')
        return 0;
    }
    console.log(nums);
    return nums[0] / nums[1];
}
