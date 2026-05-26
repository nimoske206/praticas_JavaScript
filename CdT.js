console.log("Calculador de Troco");

const readline = require("readline");

function iniciarPrograma() {
    const reader = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    adicionarProduto(reader, 0);
}
function adicionarProduto(reader, totalCompra) {
    reader.question("Digite o valor do produto: ", (resposta) => {
        let valorProduto = parseFloat(resposta);
        if (isNaN(valorProduto)) {
            console.log("Por favor, insira um valor numérico válido.");
            return adicionarProduto(reader, totalCompra);
        } else {
            let valorTotal = totalCompra + valorProduto;
            console.log("Total para pagamento: R$ " + valorTotal.toFixed(2));
            reader.question("Deseja adicionar outro produto? (s/n): ", (resposta) => {
            if (resposta.toLowerCase() === "s") {
                console.log("Adicionando outro produto.");
                return adicionarProduto(reader, valorTotal);
            } else if (resposta.toLowerCase() === "n") {
                console.log("Calculando o Troco.");
                return calcularTroco(reader, valorTotal);
            } else {
                console.log("Entrada inválida. reiniciando o programa.");
                reader.close();
                return iniciarPrograma();
            }
        
        });
        }
    });
}

function calcularTroco(reader, valorTotal) {
    reader.question("Digite o valor pago: ", (resposta) => {
        let valorPago = parseFloat(resposta);
        if (isNaN(valorPago)) {
            console.log("Por favor, insira valores numéricos válidos.");
            reader.close();
            return iniciarPrograma();
        } else {
            let troco = valorPago - valorTotal;
            if (troco < 0) {
                console.log("Valor pago é insuficiente. Faltam R$ " + Math.abs(troco).toFixed(2));
            } else if (troco === 0) {
                console.log("Valor pago é exato. Sem Troco.");
            } else {
                console.log("Troco: R$ " + troco.toFixed(2));
            }
            reader.question("deseja calcular outro Troco? (s/n): ", (resposta) => {                    
                    if (resposta.toLowerCase() === "s") {
                    console.log("Reiniciando o programa.");
                    reader.close();
                    return iniciarPrograma();
                } else if (resposta.toLowerCase() === "n") {
                    console.log("Encerrando o programa.");
                    reader.close();
                    process.exit(0);
                } else {
                    console.log("Entrada inválida. reiniciando o programa.");
                    reader.close();
                    return iniciarPrograma();
                }      
            });
        }
    });
};

iniciarPrograma();