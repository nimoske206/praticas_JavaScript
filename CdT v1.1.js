console.log("Calculador de Troco");

const readline = require("readline");

// Função para iniciar o programa
function iniciarPrograma() {
    const reader = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    adicionarProduto(reader, 0);
}

// Função para adicionar produtos e calcular o total da compra
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
                    console.log("Indo para o pagamento.");
                    return formadePagamento(reader, valorTotal);
                } else {
                    console.log("Entrada inválida.");
                    return reiniciarPrograma(reader);
                }

            });
        }
    });
}

// Função para escolher a forma de pagamento e calcular o troco
function formadePagamento(reader, valorTotal) {
    reader.question("Escolha a forma de pagamento (dinheiro/cartão): ", (resposta) => {

        // Normalização da resposta para evitar problemas com acentos e maiúsculas/minúsculas
        let forma = normalizarEntrada(resposta);

        if (forma === "dinheiro") {
            return calcularTroco(reader, valorTotal);
        } else if (forma === "cartao") {
            console.log("Pagamento com cartão selecionado.");
            return calcularTrocoCartao(reader, valorTotal);
        } else {
            console.log("Forma de pagamento inválida. Por favor, escolha 'dinheiro' ou 'cartão'.");
            return formadePagamento(reader, valorTotal);
        }
    });
}

// Função para calcular o troco para pagamento em dinheiro
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
                    return reiniciarPrograma(reader);
                } else if (resposta.toLowerCase() === "n") {
                    return encerrarPrograma(reader);
                } else {
                    console.log("Entrada inválida. reiniciando o programa.");
                    reader.close();
                    return iniciarPrograma();
                }
            });
        }
    });
};

// Função para calcular o troco para pagamento com cartão
function calcularTrocoCartao(reader, valorTotal) {
    // Lógica para pagamento com cartão
    reader.question("Debito ou credito? (d/c): ", (resposta) => {

        let tipoCartao = normalizarEntrada(resposta);

        if (tipoCartao === "d") {
            console.log("Pagamento com cartão de débito selecionado. Sem Troco.");
            return perguntarReiniciar(reader);

        } else if (tipoCartao === "c") {
            console.log("Pagamento com cartão de crédito selecionado.");

            reader.question("Deseja parcelar? (s/n): ", (resposta) => {

                // Normalização da resposta para evitar problemas com acentos e maiúsculas/minúsculas
                let opçãoParcelamento = normalizarEntrada(resposta);

                //logica para parcelamento
                if (opçãoParcelamento === "s") {
                    console.log("Parcelando pagamento.");

                    reader.question("Quantas parcelas? ", (resposta) => {
                        let parcelas = parseInt(resposta);

                        if (isNaN(parcelas) || parcelas <= 0) {
                            console.log("Por favor, insira um número válido de parcelas.");
                            return reiniciarPrograma(reader);
                        }

                        let valorParcela = valorTotal / parcelas;

                        console.log(`Valor total: R$ ${valorTotal.toFixed(2)} dividido em ${parcelas} parcelas de R$ ${valorParcela.toFixed(2)} cada.`);
                        console.log("Pagamento parcelado com sucesso.");
                        return perguntarReiniciar(reader);
                    });


                } else if (opçãoParcelamento === "n") {
                    console.log("Pagamento sem parcelamento.");
                    return perguntarReiniciar(reader);
                } else {
                    console.log("Entrada inválida. reiniciando o programa.");
                    reader.close();
                    return iniciarPrograma();
                }
            });


        } else {
            console.log("Tipo de cartão inválido.");
            return reiniciarPrograma(reader);

        }
    });
}

function perguntarReiniciar(reader) {
    reader.question("Deseja calcular outro Troco? (s/n): ", (resposta) => {
        if (resposta.toLowerCase() === "s") {
            return reiniciarPrograma(reader);
        }
        else if (resposta.toLowerCase() === "n") {
            return encerrarPrograma(reader);
        } else {
            console.log("Entrada inválida. reiniciando o programa.");
            reader.close();
            return perguntarReiniciar(reader);
        }
    });
}

function reiniciarPrograma(reader) {
    reader.close();
    console.log("Reiniciando o programa.");
    return iniciarPrograma();
}

function encerrarPrograma(reader) {
    reader.close();
    console.log("Encerrando o programa.");
    process.exit(0);
}

function normalizarEntrada(entrada) {
    return entrada.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

iniciarPrograma();
