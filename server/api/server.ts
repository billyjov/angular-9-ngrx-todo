import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as http from 'http';
import 'reflect-metadata';
import * as socketIO from 'socket.io';
import { Connection, createConnection } from 'typeorm';
import router from './router';

const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);

app.use(bodyParser.json());
app.use((_req: express.Request, res: express.Response, next: express.NextFunction) => {
    // res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use('/api', router);
app.set('port', 2000);
app.set('socketio', io);
server.listen(8080, '127.0.0.1');

createConnection().then(async (connection: Connection) => {
    app.listen(app.get('port'), () => {
        console.log(`Node API is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
        console.log(`Connected to your ${connection.options.type} database`);
        console.log('Press CTRL-C to stop\n');
    });
}).catch((error) => console.error(`TypeORM connection ${error}`));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('taskCreated', (task) => {
        io.sockets.emit('taskCreated', task);
        console.log('[TASK] Created');
    });

    socket.on('taskUpdated', (task) => {
        io.sockets.emit('taskUpdated', task);
    });

    socket.on('taskDeleted', (task) => {
        io.sockets.emit('taskDeleted', task);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

export default app;
