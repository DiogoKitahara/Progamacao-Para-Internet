import express, { query } from 'express';

const porta = 3000;
const host = '0.0.0.0';
const app = express();

var listaUsuarios = [];

app.use(express.static('./publico'));

app.use('/cadastrarUsuario', (req, resp) => {
    const nome = req.query.nome;
    const sobrenome = req.query.sobrenome;
    const usuario = req.query.usuario;
    const cep = req.query.cep;
    const cidade = req.query.cidade;
    const estado = req.query.estado;

    listaUsuarios.push({
        nome: nome,
        sobrenome: sobrenome,
        usuario: usuario,
        cidade: cidade,
        estado: estado,
        cep: cep
    });
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<meta charset="utf-8">');
    resp.write('<title>Resultado Cadastro</title>');
    resp.write('</head>');
    resp.write('<body>');
    resp.write(`<h1>Usuário ${nome} ${sobrenome} cadastrado com sucesso!</h1>`); 
    resp.write('<a href="/cadastroUsuario">Continuar cadastrando...</a>');
    resp.write('<br>');
    resp.write('<a href="listarUsuarios">Listar usuários</a>');
    resp.write('</body>');
    resp.write('<html>');
    resp.end();
});

app.use('/listarUsuarios', (req, resp) => {
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<meta charset="utf-8">');
    resp.write('<title>Resultado Cadastro</title>');
    resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" ');
    resp.write('</head>');
    resp.write('<body>');
    resp.write('<h1>Lista de Usuários</h1>');
    resp.write('<table class="table table-stripped">');
    resp.write('<tr>');
    resp.write('<th>Nome</th>');
    resp.write('<th>Sobrenome</th>');
    resp.write('<th>Usuario</th>');
    resp.write('<th>Cidade</th>');
    resp.write('<th>Estado</th>');
    resp.write('<th>CEP</th>');
    resp.write('</tr>');
    for(let i = 0; i<listaUsuarios.length; i++) {
        resp.write('<tr>');
        resp.write(`<td>${listaUsuarios[i].nome}</td>`);
        resp.write(`<td>${listaUsuarios[i].sobrenome}</td>`);
        resp.write(`<td>${listaUsuarios[i].usuario}</td>`);
        resp.write(`<td>${listaUsuarios[i].cidade}</td>`);
        resp.write(`<td>${listaUsuarios[i].estado}</td>`);
        resp.write(`<td>${listaUsuarios[i].cep}</td>`);
        resp.write('</tr>');
    }
    resp.write('</table>');
    resp.write('<a href="/">Voltar</a>');
    resp.write('</body>');
    resp.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>');
    resp.write('<html>');
    resp.end();
});

app.listen(porta, host, () => {
    console.log('Servidor esta sendo executado na porta http://' + host + ':' + porta);
})