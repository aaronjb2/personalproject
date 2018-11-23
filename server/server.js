const express = require('express');
require('dotenv').config();
const massive = require('massive');
const socket = require('socket.io');
const app = express();
const controller = require('./controller.js');
const deletePlayer = require('./deletePlayer.js');
app.use(express.json());
const {SERVER_PORT, MASSIVE_CONNECTION} = process.env;
let matchArray = [];

const io = socket(
    app.listen(SERVER_PORT, () => {
        console.log(`On the ${SERVER_PORT}th day of Christmas my true love gave to me..... nothing because I'm single`);
    })
)

massive(MASSIVE_CONNECTION).then(db=> {
    app.set('db', db);
    console.log('db is connected');
})

app.post('/api/creatematch', controller.createMatch);

app.post('/api/createplayer', controller.createPlayer);

app.post('/api/deleteplayer', deletePlayer.deletePlayer);

app.post('/api/setupidentities', controller.setupIdentities);

app.get('/api/getmatch/:matchName', controller.getMatch);

app.get('/api/getplayers/:matchName', controller.getPlayers);


io.on("connection", socket => {
    socket.on("player_count_change",data=>{
        console.log('inside player_count_change')
        io.to('myroom').emit('player_number_change',{});
    })

    socket.on("join-room",data=>{
        console.log('inside join room')
        socket.join(data.room);
        io.to(data.room);
        console.log("yes")
    })
})