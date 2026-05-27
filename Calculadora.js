console.log("Calculadora Preparada");

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let num1, num2, operacao;

readline.question('Digite o primeiro número: ', (input1) => {
    num1 = parseFloat(input1);
    readline.question('Digite o segundo número: ', (input2) => {
        num2 = parseFloat(input2);
        readline.question('Escolha a operação (soma, subtracao, multiplicacao, divisao): ', (input3) => {
            operacao = input3;
            operacao = operacao.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remove acentos
            calcular();
        });
    });
});

// Função para realizar o cálculo
function calcular() {
    let resultado;

    switch (operacao) {
        case "soma":
            resultado = num1 + num2;
            break;
        case "subtracao":
            resultado = num1 - num2;
            break;
        case "multiplicacao":
            resultado = num1 * num2;
            break;
        case "divisao":
            if (num2 !== 0) {
                resultado = num1 / num2;
            } else {
                resultado = "Erro: Divisão por zero não é permitida.";
            }
            break;
    }
    console.log(resultado);
    readline.close();
};