const express = require('express');
const path = require('path');

const app = express();
//configurando o http e websocket
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//definido a pasta onde ficarão os arquivosw frontend da aplicação
app.use(express.static(path.join(__dirname, 'public')));
//definindo onde irão ficar as views
app.set('views', path.join(__dirname, 'public'));
//definindo o uso do html para  visualização
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//quando o endereço do servidor padrão for acessado, renderizao a view index.html
app.use('/', (req, res) => {
    res.render('index.html');
});

let messages = [];
//começar a definir qual vai ser a forma de conexão do usuário com o nosso servidor
// de socket websocket
//todo vez que um novo cliente se conectar ao nosso socket
io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`);

    //acumulando as mensagens

    socket.emit('previousMessages', messages);


    socket.on('sendMessage', data => {
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    });

});





//ouvindo a porta do servidor padrão 3000
server.listen(3000)