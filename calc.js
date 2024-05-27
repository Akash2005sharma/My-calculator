let one=document.querySelector(".b1")
one.addEventListener('click',()=>{
    document.querySelector(".view").append(1)
} )
let two=document.querySelector(".b2")
two.addEventListener('click',()=>{
    document.querySelector(".view").append(2)
})
let three =document.querySelector(".b3")
three.addEventListener('click',()=>{
    document.querySelector(".view").append(`3`)
} )
let four=document.querySelector(".b4")
four.addEventListener('click',()=>{
    document.querySelector(".view").append(`4`)
} )
let five=document.querySelector(".b5")
five.addEventListener('click',()=>{
    document.querySelector(".view").append(`5`)
} )
let six=document.querySelector(".b6")
six.addEventListener('click',()=>{
    document.querySelector(".view").append(`6`)
} )
let seven=document.querySelector(".b7")
seven.addEventListener('click',()=>{
    document.querySelector(".view").append(`7`)
} )
let eight=document.querySelector(".b8")
eight.addEventListener('click',()=>{
    document.querySelector(".view").append(`8`)
} )
let nine=document.querySelector(".b9")
nine.addEventListener('click',()=>{
    document.querySelector(".view").append(`9`)
} )
let clr=document.querySelector(".b10")
clr.addEventListener('click',()=>{
    while(document.querySelector(".history").hasChildNodes){
        document.querySelector(".history").lastChild.remove()
    }
} )
let zero=document.querySelector(".b11")
zero.addEventListener('click',()=>{
    document.querySelector(".view").append(`0`)
} )
let point=document.querySelector(".b12")
point.addEventListener('click',()=>{
    document.querySelector(".view").append(`.`)
} )


let plus=document.querySelector(".f7")
plus.addEventListener('click',()=>{
    document.querySelector(".view").append(` + `)
} )
let minus=document.querySelector(".f8")
minus.addEventListener('click',()=>{
    document.querySelector(".view").append(` - `)
} )
let mul=document.querySelector(".f4")
mul.addEventListener('click',()=>{
    document.querySelector(".view").append(` * `)
} )
let divide=document.querySelector(".f5")
divide.addEventListener('click',()=>{
    document.querySelector(".view").append(` / `)
} )
let moduli=document.querySelector(".f6")
moduli.addEventListener('click',()=>{
    document.querySelector(".view").append(` % `)
} )
let root=document.querySelector(".f9")
root.addEventListener('click',()=>{
    document.querySelector(".view").append(` sqrt(`)
    
} )

let leftbr=document.querySelector(".f10")
leftbr.addEventListener('click',()=>{
    document.querySelector(".view").append(` (`)
    
} )

let rightbr=document.querySelector(".f11")
rightbr.addEventListener('click',()=>{
    document.querySelector(".view").append(`) `)
} )

let exp=document.querySelector(".f12")
exp.addEventListener('click',()=>{
    document.querySelector(".view").append(` ^ `)
} )

let back=document.querySelector(".f2")
back.addEventListener('click',()=>{
    document.querySelector(".view").lastChild.remove()
} )
let clear=document.querySelector(".f1")
clear.addEventListener('click',()=>{
    while(document.querySelector(".view").hasChildNodes){
        document.querySelector(".view").lastChild.remove()
    }
    // document.querySelector(".view").childNodes.forEach(e=>{
        //     e.remove();
        // })
} )
    
function precedence(op) {
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/' || op === '%') return 2;
    if (op === '^') return 3;
    if (op === 'sqrt') return 4; // highest precedence for square root
    return 0;
}

function applyOp(a, b, op) {
    switch(op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        case '%': return a % b;
        case '^': return Math.pow(a, b);
        case 'sqrt': return Math.sqrt(a);
    }
}

function infixToPostfix(expression) {
    let stack = [];
    let output = [];
    let i = 0;

    while (i < expression.length) {
        if (expression[i] === ' ') {
            i++;
            continue;
        }

        if (!isNaN(expression[i])) {
            let num = '';
            while (i < expression.length && (!isNaN(expression[i]) || expression[i] === '.')) {
                num += expression[i];
                i++;
            }
            output.push(parseFloat(num));
            i--;
        } else if (expression[i] === '(') {
            stack.push(expression[i]);
        } else if (expression[i] === ')') {
            while (stack.length && stack[stack.length - 1] !== '(') {
                output.push(stack.pop());
            }
            stack.pop();
        } else if (expression.slice(i, i + 4) === 'sqrt') {
            stack.push('sqrt');
            i += 3; // increment additional 3 to skip 'qrt'
        } else {
            while (stack.length && precedence(stack[stack.length - 1]) >= precedence(expression[i])) {
                output.push(stack.pop());
            }
            stack.push(expression[i]);
        }
        i++;
    }

    while (stack.length) {
        output.push(stack.pop());
    }

    return output;
}

function evaluatePostfix(postfix) {
    let stack = [];

    for (let i = 0; i < postfix.length; i++) {
        if (!isNaN(postfix[i])) {
            stack.push(postfix[i]);
        } else if (postfix[i] === 'sqrt') {
            let a = stack.pop();
            stack.push(applyOp(a, null, 'sqrt'));
        } else {
            let b = stack.pop();
            let a = stack.pop();
            stack.push(applyOp(a, b, postfix[i]));
        }
    }

    return stack.pop();
}

function evaluateInfix(expression) {
    let postfix = infixToPostfix(expression);
    return evaluatePostfix(postfix);
}


// Example usage:
/*
let expression = "3 + 5 * ( 2 - 8 ) ^ 2";
console.log(evaluateInfix(expression));  // Output: -147

expression = "sqrt ( 16 ) + 2 * 3 ^ 2";
console.log(evaluateInfix(expression));  // Output: 20

expression = "10 % 3 + 2 * 2";
console.log(evaluateInfix(expression));  // Output: 5

// Example usage:

let expression = "3 + 5 * ( 2 - 8 )";
console.log(evaluateInfix(expression));  // Output: -13
*/

let br=document.createElement('br');
let result=document.querySelector(".f3")
result.addEventListener('click',()=>{
    let exp=document.querySelector(".view").innerText
    let answer=evaluateInfix(exp)
    // while(document.querySelector(".view").hasChildNodes){
    //     document.querySelector(".view").lastChild.remove()
    // }
    document.querySelector(".view").replaceChildren(`${answer}`)
    let h=document.createElement('div')
    h.append(`${exp} = ${answer}`)
    document.querySelector(".history").append(h)
    // document.querySelector(".history").append(` = ${answer}`)
} )