const express = require('express');
require('dotenv').config();
const massive = require('massive');
const socket = require('socket.io');
const app = express();
const controller = require('./controller.js');
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

app.post('/api/makeit',controller.makeIt);

app.put('/api/setplayersup/:room/:player1name/:player1identity/:player2name/:player2identity/:player3name/:player3identity/:player4name/:player4identity/:player5name/:player5identity/:player6name/:player6identity/:player7name/:player7identity/:player8name/:player8identity/:player9name/:player9identity/:player10name/:player10identity/:teamLeader',controller.setPlayersUp);

app.get('/api/getinformation/:room', controller.getInformation);

app.post(`/api/createvotes`,controller.createVotes);

app.post(`/api/createexecutions/:room`,controller.createExecutions)

app.use( express.static( `${__dirname}/../build` ) );

app.delete(`/api/deletegame/:room`,controller.deleteGame);

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
        io.to(data.room).emit('request-to-join',{name:data.name,room:data.room})
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
        console.log('who is on the quest')
        io.to(data.room).emit('who-is-on-the-quest',{name:data.name})
    })

    socket.on('here-are-the-people',data=>{
        console.log('here are the people')
        io.to(data.room).emit('here-are-the-people',{onQuestArray:data.onQuestArray,playerArray:data.playerArray,voted:data.voted,name:data.name})
    })

    socket.on('cast-vote',data=>{
        io.to(data.room).emit('cast-vote',{name:data.name,vote:data.vote})
    })

    socket.on('hang-out',data=>{
        io.to(data.room).emit('hang-out')
    })

    socket.on('go-here',data=>{
        io.to(data.room).emit('go-here',{phase:data.phase})
    })

    socket.on('am-i-on-this',data=>{
        io.to(data.room).emit('am-i-on-this',{name:data.name})
    })

    socket.on('you-belong-here',data=>{
        io.to(data.room).emit('you-belong-here',{name:data.name,onQuest:data.onQuest})
    })

    socket.on('submit-execution',data=>{
        io.to(data.room).emit('submit-execution',{name:data.name,execution:data.execution})
    })

    socket.on('what-is-my-role',data=>{
        io.to(data.room).emit('what-is-my-role',{name:data.name})
    })

    socket.on('this-is-your-role',data=>{
        io.to(data.room).emit('this-is-your-role',{name:data.name,playerArray:data.playerArray})
    })

    socket.on('on-chopping-block',data=>{
        io.to(data.room).emit('on-chopping-block',{onChoppingBlock:data.onChoppingBlock})
    })

    socket.on('final-merlin-guess',data=>{
        io.to(data.room).emit('final-merlin-guess',{onChoppingBlock:data.onChoppingBlock})
    })

    socket.on('give-me-history',data=>{
        io.to(data.room).emit('give-me-history',{name:data.name})
    })

    socket.on('here-is-history',data=>{
        io.to(data.room).emit('here-is-history',{name:data.name,playerArray:data.playerArray,quest:data.quest,attempt:data.attempt,resultsArray:data.resultsArray,proposedQuestsArray:data.proposedQuestsArray})
    })
})