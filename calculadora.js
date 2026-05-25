console.log("Ola mundo, está é a minha primeira calculadora em JavaScript!");

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
readline.question("Digite o primeiro número: ", (num1) => {
    readline.question("Digite o segundo número: ", (num2) => {
        readline.question("Escolha a operação (add, subtract, multiply, divide): ", (operation) => {
            const a = parseFloat(num1);
            const b = parseFloat(num2);
            let result;
            switch (operation) {
                case 'add':
                    result = add(a, b);
                    break;
                case 'subtract':
                    result = subtract(a, b);
                    break;
                case 'multiply':
                    result = multiply(a, b);
                    break;
                case 'divide':
                    result = divide(a, b);
                    break;
                default:
                    console.error("Error: Invalid operation.");
                    return;
            }
            console.log(`Result: ${result}`);
        });
    });
});

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
    if (b === 0) {
        console.error("Error: Division by zero is not allowed.");
        return null;
    }
    return a / b;
};