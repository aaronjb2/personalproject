const express = require('express');
require('dotenv').config();
const massive = require('massive');
const socket = require('socket.io');
const app = express();
const controller = require('./controller.js');
const deletePlayer = require('./deletePlayer.js');
const getProposedQuest = require('./getProposedQuest.js');
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

app.get('/api/gamestarted/:matchName', controller.gameStarted);

app.post('/api/gamestartedtrue', controller.gameStartedTrue);

app.post('/api/createresultsrow', controller.createResultsRow)

app.get('/api/getidentities/:matchName',controller.getIdentities);

app.post('/api/createrowquest1', controller.createRowQuest1);

app.post('/api/createrowquest2', controller.createRowQuest2);

app.post('/api/createrowquest3', controller.createRowQuest3);

app.post('/api/createrowquest4', controller.createRowQuest4);

app.post('/api/createrowquest5', controller.createRowQuest5);

app.get('/api/getphase/:matchName', controller.getPhase);

app.get(`/api/getallbasicgameinfo/:matchName`, controller.getAllBasicGameInfo);

app.put(`/api/updateplayersonquest/:matchName/:questNumber/:questPlayer1/:questPlayer2/:questPlayer3/:questPlayer4/:questPlayer5`,controller.editPlayersOnQuest);

app.post('/api/createvotecolumn', controller.createVoteColumn);

app.post('/api/castvote', controller.castVote);

app.get('/api/hasvoted/:matchName/:playerNumber/:quest/:attempt', controller.castVote);

app.get('/api/getproposedquest/:matchName/:quest/:attempt', getProposedQuest.getProposedQuest)

app.put('/api/changephase/:matchName/:phase',controller.changePhase);

app.get('/api/getquestandattempt/:matchName',controller.getQuestAndAttempt)

app.get('/api/getvoteevaluationnumbers/:matchName',controller.getVoteEvaluationNumbers);

app.put('/api/increasenumberofvotes/:matchName',controller.getVoteEvaluationNumbers);

io.on("connection", socket => {
    socket.on("player_count_change",data=>{
        socket.join('myroom');
        if (data.decrease){
            io.to('myroom').emit('player_number_change',{decrease:true,playerNumber:data.playerNumber});
        }else{
            io.to('myroom').emit('player_number_change',{});
        }
    })

    socket.on("join-room",data=>{
        socket.join(data.room);
        io.to(data.room);
    })

    socket.on("game-started",data=>{
        console.log('inside game started')
        io.to('myroom').emit("game-began");
    })

    socket.on("time-to-vote",data=>{
        console.log('inside time to vote')
        io.to('myroom').emit("time-to-vote");
    })
})