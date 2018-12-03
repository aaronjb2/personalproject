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

app.put('/api/switchoverwhendonevoting/:matchName/:quest/:attempt',controller.SwitchOverWhenDoneVoting)

app.put('/api/fix/:quest/:attempt/:playeronquest1/:playeronquest2/:playeronquest3/:playeronquest4/:playeronquest5/:matchName',controller.fix)

app.get('/api/getquest/:matchName',controller.getQuest)

app.get('/api/getcurrentexecution/:matchName/:quest',controller.getCurrentExecution)

app.put('/api/submitquestexecution/:quest/:execution/:playerNumber/:matchName',controller.submitExecution)

app.get('/api/questattemptteamleader/:matchName', controller.getQuestAttemptTeamleader)

app.put('/api/adjustquest/:matchName/:onArray/:quest', controller.adjustQuest);

app.post('/api/makeit',controller.makeIt);

app.put('/api/setplayersup/:room/:player1name/:player1identity/:player2name/:player2identity/:player3name/:player3identity/:player4name/:player4identity/:player5name/:player5identity/:player6name/:player6identity/:player7name/:player7identity/:player8name/:player8identity/:player9name/:player9identity/:player10name/:player10identity/:teamLeader',controller.setPlayersUp);

app.get('/api/getinformation/:room', controller.getInformation);

app.post(`/api/createvotes`,controller.createVotes);

app.use( express.static( `${__dirname}/../build` ) );

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

    socket.on("permission-granted",data=>{
        io.to(data.room).emit("permission-granted", {name:data.name})
    })

    socket.on('request-to-join',data=>{
        io.to(data.room).emit('request-to-join',{name:data.name})
    })

    socket.on("game-started",data=>{
        io.to('myroom').emit("game-began");
    })

    socket.on("time-to-vote",data=>{
        io.to('myroom').emit("time-to-vote");
    })

    socket.on("done-voting",data=>{
        io.to('myroom').emit("done-voting");
    })

    socket.on("done-executing",data=>{
        io.to('myroom').emit("done-executing");
    })

    socket.on("come-inside",data=>{
        io.to(data.room).emit("come-inside");
    })

    socket.on('request-identities',data=>{
        io.to(data.room).emit('request-identities');
    })

    socket.on('provide-identities',data=>{
        io.to(data.room).emit('provide-identities',{playerArray:data.playerArray})
    })

    socket.on('where-do-i-go',data=>{
        io.to(data.room).emit('where-do-i-go',{name:data.name})
    })

    socket.on('go-here',data=>{
        io.to(data.room).emit('go-here',{phase:data.phase,name:data.name})
    })

    socket.on('who-is-team-leader',data=>{
        io.to(data.room).emit('who-is-team-leader',{name:data.name})
    })

    socket.on('this-is-team-leader',data=>{
        io.to(data.room).emit('this-is-team-leader',{name:data.name,playerArray:data.playerArray,teamLeader:data.teamLeader,numberOfPeopleThatCanGo:data.numberOfPeopleThatCanGo})
    })

    socket.on('alter-those-on-quest',data=>{
        io.to(data.room).emit('alter-those-on-quest',{selectedForQuest:data.onQuestArray,notSelectedForQuest:data.notOnQuestArray})
    })

    socket.on('commence-voting',data=>{
        io.to(data.room).emit('commence-voting');
    })

    socket.on('come-vote',data=>{
        io.to(data.room).emit('come-vote');
    })

    socket.on('who-is-on-the-quest',data=>{
        io.to(data.room).emit('who-is-on-the-quest',{name:data.name})
    })

    socket.on('here-are-the-people',data=>{
        io.to(data.room).emit('here-are-the-people',{onQuestArray:data.onQuestArray,playerArray:data.playerArray,voted:data.voted,name:data.name})
    })

    socket.on('cast-vote',data=>{
        io.to(data.room).emit('cast-vote',{name:data.name,vote:data.vote})
    })

    socket.on('hang-out',data=>{
        io.to(data.room).emit('hang-out')
    })

    socket.on('go-here',data=>{
        console.log('inside go here')
        io.to(data.room).emit('go-here',{phase:data.phase})
    })
})