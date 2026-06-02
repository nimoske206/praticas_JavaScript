console.log("Calculador de Troco");

const readline = require("readline");

// Função para adicionar produtos e calcular o total da compra
async function adicionarProduto(leitor, totalCompra) {
    const resposta = await perguntar(leitor, "Digite o valor do produto: ");
        let valorProduto = parseFloat(resposta);
        
        // Verificar se a entrada é um número válido
        if (isNaN(valorProduto) || valorProduto < 0) {
            return tratarErro(leitor, "Valor inválido. Por favor, insira um valor numérico válido.", () => adicionarProduto(leitor, totalCompra));
        
        //somar o valor do produto ao total da compra
        } else {
            let valorTotal = totalCompra + valorProduto;
            console.log("Total para pagamento: R$ " + valorTotal.toFixed(2));
            const continuar = await perguntar(leitor, "Deseja adicionar outro produto? (sim/nao): ");
            let continuarNormalizado = normalizarEntrada(continuar);
                if (continuarNormalizado === "sim") {
                    console.log("Adicionando outro produto.");
                    return adicionarProduto(leitor, valorTotal);
                } else if (continuarNormalizado === "nao") {
                    console.log("Indo para o pagamento.");
                    return formadePagamento(leitor, valorTotal);
                } else {
                return tratarErro(leitor, "Entrada inválida. Por favor, responda com 'sim' ou 'não'.", () => adicionarProduto(leitor, valorTotal));
                }

            };
        }
    

// Função para escolher a forma de pagamento e calcular o troco
async function formadePagamento(leitor, valorTotal) {
    const resposta = await perguntar(leitor, "Escolha a forma de pagamento (dinheiro/cartão): ");

        // Normalização da resposta para evitar problemas com acentos e maiúsculas/minúsculas
        let forma = normalizarEntrada(resposta);

        if (forma === "dinheiro") {
            return calcularTroco(leitor, valorTotal);
        } else if (forma === "cartao") {
            console.log("Pagamento com cartão selecionado.");
            return calcularTrocoCartao(leitor, valorTotal);
        } else {
            console.log("Forma de pagamento inválida. Por favor, escolha 'dinheiro' ou 'cartão'.");
            return formadePagamento(leitor, valorTotal);
        }
    };


// Função para calcular o troco para pagamento em dinheiro
async function calcularTroco(leitor, valorTotal) {
    const resposta = await perguntar(leitor, "Digite o valor pago: ");
    let valorPago = parseFloat(resposta);
        
    // Verificar se a entrada é um número válido
    if (isNaN(valorPago)) {
        return tratarErro(leitor, "Valor inválido. Por favor, insira um valor numérico válido.", () => calcularTroco(leitor, valorTotal));
        
        // Calcular o troco
        } else {
            let troco = valorPago - valorTotal;
            
            //Se o valor pago for menor que o total, informar o valor faltante
            if (troco < 0) {
                console.log("Valor pago é insuficiente. Faltam R$ " + Math.abs(troco).toFixed(2));
            
            //Se o valor pago for exato,confirmar que não há troco
            } else if (troco === 0) {
                console.log("Valor pago é exato. Sem Troco.");
            
            //Se o valor pago for maior que o total, informar o valor do troco
            } else {
                console.log("Troco: R$ " + troco.toFixed(2));
            }
            const respostaTroco = await perguntar(leitor, "deseja calcular outro Troco? (sim/nao): ");
            let respostaNormalizada = normalizarEntrada(respostaTroco);
            if (respostaNormalizada === "sim") {
                return reiniciarPrograma(leitor);
            } else if (respostaNormalizada === "nao") {
                return encerrarPrograma(leitor);
            } else {
                console.log("Entrada inválida. reiniciando o programa.");
                return tratarErro(leitor, "Entrada inválida. coloque um valor valido", () => calcularTroco(leitor, valorTotal));
            }
        }
    };

// Função para calcular o troco para pagamento com cartão
async function calcularTrocoCartao(leitor, valorTotal) {
    // Lógica para pagamento com cartão
    const resposta = await perguntar(leitor, "Debito ou credito? (Debito/Credito): ");
    let tipoCartao = normalizarEntrada(resposta);

        if (tipoCartao === "debito") {
            console.log("Pagamento com cartão de débito selecionado. Sem Troco.");
            return perguntarReiniciar(leitor);

        } else if (tipoCartao === "credito") {
            console.log("Pagamento com cartão de crédito selecionado.");

            const cartao = await perguntar(leitor, "Deseja parcelar? (sim/nao): ");
            
            // Normalização da resposta para evitar problemas com acentos e maiúsculas/minúsculas
            let opçãoParcelamento = normalizarEntrada(cartao);

                //logica para parcelamento
                if (opçãoParcelamento === "sim") {
                    console.log("Parcelando pagamento.");

                    const parcelas = await perguntar(leitor, "Quantas parcelas? ");
                    let numParcelas = parseInt(parcelas);

                    if (isNaN(numParcelas) || numParcelas <= 0) {
                        return tratarErro(leitor, "Número de parcelas inválido. Por favor, insira um número válido.", () => calcularTrocoCartao(leitor, valorTotal));
                        }

                        let valorParcela = valorTotal / numParcelas;

                        console.log(`Valor total: R$ ${valorTotal.toFixed(2)} dividido em ${numParcelas} parcelas de R$ ${valorParcela.toFixed(2)} cada.`);
                        console.log("Pagamento parcelado com sucesso.");
                        return perguntarReiniciar(leitor);
                    


                    }else if (opçãoParcelamento === "nao") {
                    console.log("Pagamento sem parcelamento.");
                    return perguntarReiniciar(leitor);
                    } else {
                    
                    return tratarErro(leitor, "Entrada inválida. Por favor, responda com 'sim' ou 'não'.", () => calcularTrocoCartao(leitor, valorTotal));
                }
            
            } else {
            return tratarErro(leitor, "Entrada inválida. Por favor, escolha 'débito' ou 'crédito'.", () => calcularTrocoCartao(leitor, valorTotal));
        }
    };
    

// Função para perguntar ao usuário se deseja reiniciar o programa
async function perguntarReiniciar(leitor) {
    const resposta = await perguntar(leitor, "Deseja calcular outro Troco? (sim/nao): ");
    let respostaNormalizada = normalizarEntrada(resposta);

        if (respostaNormalizada === "sim") {
            return reiniciarPrograma(leitor);
        }
        else if (respostaNormalizada === "nao") {
            return encerrarPrograma(leitor);
        } else {
            return tratarErro(leitor, "Entrada inválida. Por favor, responda com 'sim' ou 'não'.", () => perguntarReiniciar(leitor));
        }
    };


//função para reiniciar o programa
function reiniciarPrograma(leitor) {
    console.log("Reiniciando o programa.");
    return menu(leitor);
}

//função para encerrar o programa
function encerrarPrograma(leitor) {
    leitor.close();
    console.log("Encerrando o programa.");
    process.exit(0);
}

// Função para normalizar a entrada do usuário, removendo acentos e convertendo para minúsculas
function normalizarEntrada(entrada) {
    return entrada.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

//Menu principal do programa
async function menu(leitor) {

    console.log("Bem-vindo ao Calculador de Troco!");
    console.log("1. Iniciar cálculo de troco");
    console.log("2. Sair");
    
    const resposta = await perguntar(leitor, "Escolha uma opção: ");
        
        if (resposta === "1") {
        return adicionarProduto(leitor, 0);
        
        } else if (resposta === "2") {
        return encerrarPrograma(leitor);
    
        } else {
        return tratarErro(leitor, "Opção inválida. Por favor, escolha novamente.", () => menu(leitor));
        }
    };


// Função para criar uma interface de leitura
function leitor() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

//Função para fazer perguntas ao usuário e retornar a resposta como uma Promise
function perguntar(leitor, pergunta) {
    return new Promise((resolve) => {
        leitor.question(pergunta, (resposta) => {
            resolve(resposta);
        });
    });
}

//Função para reiniciar o programa em caso de erro ou entrada inválida
async function tratarErro(leitor, mensagem, callback) {
    console.log(mensagem);
    return await callback();
}

menu(leitor());
