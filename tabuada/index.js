import express from 'express';

const host = '0.0.0.0';
const porta = 3001;
const app = express();

function mostrarTabuada(requisicao, resposta) {
    let numero = parseFloat(requisicao.query.numero);
    let sequencia = parseInt(requisicao.query.sequencia);
    if (!sequencia) {
        sequencia = 10;
    }
    resposta.write('<!DOCTYPE html>');
    resposta.write('<html>');
    resposta.write('<head>');
    resposta.write('<meta charset = "utf-8">');
    resposta.write('<title>Tabuada</title>');
    resposta.write('</head>');
    resposta.write('<body>');
    if (!numero) {
        resposta.write('<h1>Informe o parâmetro valor na url: http://localhost:3001/?numero=7&sequencia=10</h1>');
    }
    else {
        for(let i = 0; i < sequencia; i++) {
            resposta.write('<h3>' + numero + ' x ' + i + ' = ' + numero * i);
        }
    }
    resposta.write('</body>');
    resposta.write('</html>');
    resposta.end();
}

app.get("/", mostrarTabuada);

app.listen(porta, host, () => {
    console.log("Servidor executando em http://" + host + ":" + porta);
})