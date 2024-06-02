import express from 'express';
import path from 'path';

const host = '0.0.0.0';
const porta = 3000;
const app = express();

let listaUsuarios = [];

app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(process.cwd(), 'publico')));

function cadastrarUsuario(requisicao, resposta) {
    const nome = requisicao.body.nome;
    const sobrenome = requisicao.body.sobrenome;
    const usuario = requisicao.body.usuario;
    const cidade = requisicao.body.cidade;
    const estado = requisicao.body.estado;
    const cep = requisicao.body.cep;

    if (nome && sobrenome && usuario && cidade && estado && cep) {
        listaUsuarios.push({
            nome: nome,
            sobrenome: sobrenome,
            usuario: usuario,
            cidade: cidade,
            estado: estado,
            cep: cep
        });
        resposta.redirect('/listarUsuarios');
    }
    else {
        resposta.write(`
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            <title>Página de cadastrode usuarios</title>
        </head>

        <body>
            <div class="container">
                <form method="POST" action="/cadastrarUsuario" class="border row g-3 needs-validation" novalidate>
                    <legend>Cadastro de Usuário</legend>
                    <div class="col-md-4">
                        <label for="validationCustom01" class="form-label">Nome</label>
                        <input type="text" class="form-control" id="nome" name="nome" value="${nome}" required>`);
        if (nome == "") {
            resposta.write(`
            <div class="alert alert-danger" role="alert">
            Por favor, informe o nome.
            </div>`);
        }
        resposta.write(`
        </div>
        <div class="col-md-4">
            <label for="validationCustom02" class="form-label">Sobrenome</label>
            <input type="text" class="form-control" id="sobrenome" name="sobrenome" value="Otto" value="${sobrenome}" required>`);
        if (sobrenome == "") {
            resposta.write(`
            <div class="alert alert-danger" role="alert">
            Por favor, informe o sobrenome.
            </div>`);
        }
        resposta.write(`
        </div>
        <div class="col-md-4">
            <label for="validationCustomUsername" class="form-label">Usuário</label>
            <div class="input-group has-validation">
                <span class="input-group-text" id="inputGroupPrepend">@</span>
                <input type="text" class="form-control" id="usuario" name="usuario"
                    aria-describedby="inputGroupPrepend" value="${usuario}" required>`);
        if (usuario == "")  {
            resposta.write(`
            <div class="alert alert-danger" role="alert">
            Por favor, informe o nome de usuario.
            </div>`);
        }
        resposta.write(`
        </div>
        </div>
        <div class="col-md-6">
            <label for="validationCustom03" class="form-label">Cidade</label>
            <input type="text" class="form-control" id="cidade" name="cidade" value="${cidade}" required>`);
        if (cidade == "") {
            resposta.write(`
            <div class="alert alert-danger" role="alert">
            Por favor, informe a cidade.
            </div>`);
        }
        resposta.write(`
        </div>
        <div class="col-md-3">
            <label for="validationCustom04" class="form-label">UF</label>
            <select class="form-select" id="estado" name="estado" required>
                <option selected disabled value="${estado}">Escolha um estado...</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
            </select>`);
        if (estado == undefined) {
            resposta.write(`
            <div class="alert alert-danger" role="alert">
            Por favor, selecione um estado.
             </div>`);
        }
        resposta.write(`
        </div>
        <div class="col-md-3">
            <label for="validationCustom05" class="form-label">CEP</label>
            <input type="text" class="form-control" id="cep" name="cep" value="${cep}" required>`);
        if (cep == "") {
            resposta.write(`
            <div class="alert alert-danger" role="alert">
            Por favor, informe o CEP.
            </div>`);
        }
        resposta.write(`
        </div>
        <div class="col-12 mb-3">
            <button class="btn btn-primary" type="submit">Cadastrar</button>
            <a class=" btn btn-secondary" href="/">Voltar</a>
        </div>
        </form>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
            crossorigin="anonymous"></script>
        </body>

        </html>`);
    }
    resposta.end();
}

app.post('/cadastrarUsuario', cadastrarUsuario);

app.get('/listarUsuarios', (req,resp)=>{
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<title>Resultado do cadastro</title>');
    resp.write('<meta charset="utf-8">');
    resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">')
    resp.write('</head>');
    resp.write('<body>');
    resp.write('<h1>Lista de Usuários</h1>');
    resp.write('<table class="table table-striped">');
    resp.write('<tr>');
    resp.write('<th>Nome</th>');
    resp.write('<th>Sobrenome</th>');
    resp.write('<th>Usuario</th>');
    resp.write('<th>Cidade</th>');
    resp.write('<th>Estado</th>');
    resp.write('<th>CEP</th>');
    resp.write('</tr>');
    for (let i=0; i<listaUsuarios.length; i++){
        resp.write('<tr>');
        resp.write(`<td>${listaUsuarios[i].nome}`);
        resp.write(`<td>${listaUsuarios[i].sobrenome}`);
        resp.write(`<td>${listaUsuarios[i].usuario}`);
        resp.write(`<td>${listaUsuarios[i].cidade}`);
        resp.write(`<td>${listaUsuarios[i].estado}`);
        resp.write(`<td>${listaUsuarios[i].cep}`);
        resp.write('</tr>');
    }
    resp.write('</table>');
    resp.write('<a href="/">Voltar</a>');
    resp.write('</body>');
    resp.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>')
    resp.write('</html>');
    resp.end();
});

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});