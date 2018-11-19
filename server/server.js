const express = require('express');
require('dotenv').config();
const massive = require('massive');
const gameFunctions = require('./gameFunctions');
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

//app.post('/api/startmatch', controller.startMatch)


io.on("connection", socket => {

})