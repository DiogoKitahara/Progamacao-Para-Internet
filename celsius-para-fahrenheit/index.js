// Pediram para nós desenvolver uma aplicação web capaz de converter graus celsius em fahrenheit
import express from 'express'; // permite criar aplicacoes rapida

const host = '0.0.0.0'; // este ip representa todas as placas de redes do computador que esta executando esta aplicacao
const porta = 3000; // identifica o programa, dentre tantos outros programas que estao em execucao no computador e esteja executando essa aplicacao
const app = express(); // 

// requisicao vem da internet e a resposta é enviada para a Internet para quem fez a requisicao
function retornaPaginaInicial(requisicao, resposta) {
    resposta.write('<!DOCTYPE html');
    resposta.write('<html>');
    resposta.write('<head>');
    resposta.write('<meta charset = "utf-8">');
    resposta.write('<title>Página Inicial</title>');
    resposta.write('</head>');
    resposta.write('<body>');
    resposta.write('<h1>Página Inicial</h1>');
    resposta.write('</body>');
    resposta.write('</html>');
    resposta.end();
}

function enviarDinheiro(requisicao, resposta) {
    // extrair da url da requisicao o valor desejado pelo usuario
    let valor_desejado = requisicao.query.valor;
    if (!valor_desejado) {
        valor_desejado = 0;
    }
    resposta.write('<!DOCTYPE html');
    resposta.write('<html>');
    resposta.write('<head>');
    resposta.write('<meta charset = "utf-8">');
    resposta.write('<title>Oferta de Dinheiro</title>');
    resposta.write('</head>');
    resposta.write('<body>');
    if (valor_desejado > 0) {
        resposta.write('<h1>Toma aqui seus R$' + valor_desejado + '</h1>');
    }
    else {
        resposta.write('<h1>Informe o parâmetro valor na url: http://localhost:3000/dinheiro?valor=100</h1>');
    }
    resposta.write('</body>');
    resposta.write('</html>');
    resposta.end();
}

function converterCelsiusFahrenheit(requisicao, resposta) {
    // extrair pela url os graus celsius
    let graus_celsius = requisicao.query.grausCelsius;
    graus_celsius = parseFloat(graus_celsius);
    let sequencia = requisicao.query.sequencia;
    sequencia = parseInt(sequencia);
    if (!sequencia) {
        sequencia = 1;
    }
    resposta.write('<!DOCTYPE html');
    resposta.write('<html>');
    resposta.write('<head>');
    resposta.write('<meta charset = "utf-8">');
    resposta.write('<title>Conversor de graus Celsius para Fahrenheit</title>');
    resposta.write('</head>');
    resposta.write('<body>');
    if (graus_celsius) {
        for (let i = 0; i < sequencia; i++) {
            let resultado = graus_celsius * 1.8 + 32;
            resposta.write('<h1> ' + graus_celsius + ' Graus Celsius = ' + resultado + ' Fahrenheit</h1>');
            graus_celsius++;
        }
    }
    else {
        resposta.write('<h1>Informe o parâmetro valor na url: http://localhost:3000/conversor?grausCelsius=100</h1>');
    }
    resposta.write('</body>');
    resposta.write('</html>');
    resposta.end();
}

// javascript permite passar funcao como parametro
app.get("/", retornaPaginaInicial);
app.get("/dinheiro", enviarDinheiro);
app.get("/conversor", converterCelsiusFahrenheit);

// () => {} funcao anonima conhecida como arrow function
app.listen(porta, host, () => {
    console.log("Servidor esta executando em http://" + host + ":" + porta);
})