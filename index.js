const display = document.querySelector('.display')
const numberButtons = document.querySelectorAll('.btn-number')
const operatorButtons = document.querySelectorAll('.btn-operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');

display.textContent = 0;

let data = {
    op: undefined,
    num1: 0,
    num2: 0,
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
        data.op = (e.target.id); 
    })
}

// Equals listener
equalsButton.addEventListener('click', () => {
    if (data.op) {
        operate(data.op, Number(data.num1), Number(data.num2));
        displayUpdate(data.num1);
    }
})

// Clear listener
clearButton.addEventListener('click', () => clear());

function numberLogic(obj) {
    let number = obj.target.textContent;
     // num1
    if (!data.num1 == 0 && !data.op && !data.num2) {
        let result = data.num1 += number;

        displayUpdate(result)
        return result;
    }
    // num1, op
    if (data.num1 && data.op && data.num2 == 0) {
        displayUpdate(number);
        return data.num2 = number;
    }
    // num1, num2, op
    if (data.num1 && data.op && !data.num2 == 0) {
        let result = data.num2 += number;
        
        displayUpdate(result);
        return data.num2 += number;
    }
    // empty (base)
    if (data.num1 == 0 && data.num2 == 0) {
        displayUpdate(number);
        return data.num1 = number;
    }
}

function operate(operator, num1, num2) {
    switch (operator) {
        case 'sum':
                data.num1 = sum(num1, num2);
                data.num2 = 0;
                data.op = undefined;
                result = 0;
                break;
        case 'subtract':
                data.num1 = subtract(num1, num2);
                data.num2 = 0;
                data.op = undefined;
                result = 0;
                break;
        case 'multiply':
                data.num1 = multiply(num1, num2);
                data.num2 = 0;
                data.op = undefined;
                result = 0;
                break;
        case 'divide':
                data.num1 = divide(num1, num2);
                data.num2 = 0;
                data.op = undefined;
                result = 0;
                break;
    }
}


function displayUpdate(num) {
    display.textContent = num;
}

function clear() {
    data.op = undefined
    data.num1 = 0
    data.num2 = 0
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
    console.log(nums);
    return nums[0] / nums[1];
}
