const numberButtons = document.querySelectorAll('.btn-number')
const operatorButtons = document.querySelectorAll('.btn-operator');

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


function numberLogic(obj) {
    let number = obj.target.textContent;
     // num1
    if (!data.num1 == 0 && !data.op && !data.num2) {
        return data.num1 += number;
    }
    // num1, op
    if (data.num1 && data.op && data.num2 == 0) {
        return data.num2 = number;
    }
    // num1, num2, op
    if (data.num1 && data.op && !data.num2 == 0) {
        return data.num2 += number;
    }
    // empty (base)
    if (data.num1 == 0 && data.num2 == 0) {
        return data.num1 = number;
    }
}

function operate(operator, num1, num2) {
    return operator(num1, num2)
}


let data = {
    op: undefined,
    num1: 0,
    num2: 0,
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
