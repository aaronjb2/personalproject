const socket = require("socket.io");
const io = socket();

module.exports = {
    async makeIt(req,res,next){
        let {room} = req.body;
        let db = req.app.get('db');
        let a = await db.is_it_there([room]);
        if (!a[0]){
            await db.make_it([room]);
            return res.sendStatus(200);
        }
        else {
            return res.status(200).send({message:"This one already exists"})
        }
    },
    async setPlayersUp(req,res,next){
        let {room,player1name,player1identity,player2name,player2identity,player3name,player3identity,player4name,player4identity,player5name,player5identity,player6name,player6identity,player7name,player7identity,player8name,player8identity,player9name,player9identity,player10name,player10identity,teamLeader,player1image,player2image,player3image,player4image,player5image,player6image,player7image,player8image,player9image,player10image} = req.body;
        let db = req.app.get('db');
        await db.update_game_players([player1name,player1identity,player2name,player2identity,player3name,player3identity,player4name,player4identity,player5name,player5identity,player6name,player6identity,player7name,player7identity,player8name,player8identity,player9name,player9identity,player10name,player10identity,teamLeader,room,player1image,player2image,player3image,player4image,player5image,player6image,player7image,player8image,player9image,player10image])
        res.sendStatus(200);
    },
    async getInformation(req,res,next){
        let {room} = req.params;
        let db = req.app.get('db');
        let [avalonGamePlayers] = await db.get_avalon_game_players([room]);
        if (!avalonGamePlayers){return res.status(200).send({message:"There is no information"})}
        let a = [{name:avalonGamePlayers.player1name,identity:avalonGamePlayers.player1identity,image:avalonGamePlayers.player1image},{name:avalonGamePlayers.player2name,identity:avalonGamePlayers.player2identity,image:avalonGamePlayers.player2image},{name:avalonGamePlayers.player3name,identity:avalonGamePlayers.player3identity,image:avalonGamePlayers.player3image},{name:avalonGamePlayers.player4name,identity:avalonGamePlayers.player4identity,image:avalonGamePlayers.player4image},{name:avalonGamePlayers.player5name,identity:avalonGamePlayers.player5identity,image:avalonGamePlayers.player5image},{name:avalonGamePlayers.player6name,identity:avalonGamePlayers.player6identity,image:avalonGamePlayers.player1image},{name:avalonGamePlayers.player7name,identity:avalonGamePlayers.player7identity,image:avalonGamePlayers.player7image},{name:avalonGamePlayers.player8name,identity:avalonGamePlayers.player8identity,image:avalonGamePlayers.player8image},{name:avalonGamePlayers.player9name,identity:avalonGamePlayers.player9identity,image:avalonGamePlayers.player9image},{name:avalonGamePlayers.player10name,identity:avalonGamePlayers.player10identity,image:avalonGamePlayers.player10image}];
        let playerArray = a.filter(element=>element.identity && element.identity != 'null');
        playerArray.forEach(element=>{element.loyalty = element.identity == "Loyal Servant Of King Arthur" || element.identity == "Merlin" || element.identity == "Percival"?"good":"evil"})
        let avalonExecutions = await db.get_avalon_executions([room]);
        let b = [avalonExecutions[0]?avalonExecutions[0].result:null,avalonExecutions[1]?avalonExecutions[1].result:null,avalonExecutions[2]?avalonExecutions[2].result:null,avalonExecutions[3]?avalonExecutions[3].result:null,avalonExecutions[4]?avalonExecutions[4].result:null];
        let resultsArray = b.filter(element=>element == 'successful' || element == 'failed');
        let successCount = 0;
        resultsArray.forEach(element=>{if (element == 'successful'){successCount++;}})
        let avalonProposals = await db.get_avalon_proposals([room]);
        let index = avalonProposals.findIndex(element=>element.quest==resultsArray.length+1);
        let quest = resultsArray.length+1;
        let phase;
        let attempt;
        let teamLeader
        if (avalonProposals.length > 0){
            teamLeader = avalonProposals[avalonProposals.length-1].teamleader == playerArray.length?1:avalonProposals[avalonProposals.length-1].teamleader+1;
        }else{
            teamLeader = avalonGamePlayers.firstteamleader
        }
        if (index == -1){
            phase = 'propose';
            attempt = 1;
        }else{
            index = avalonProposals.findIndex(element=>element.quest==resultsArray.length+1 && element.result == "approve");
            if (index == -1 ){
                phase = 'propose';
                attempt = avalonProposals.findIndex(element=>element.quest-1 == resultsArray.length && element.attempt == 4) != -1?5:avalonProposals.findIndex(element=>element.quest-1 == resultsArray.length && element.attempt == 3) != -1?4:avalonProposals.findIndex(element=>element.quest-1 == resultsArray.length && element.attempt == 2) != -1?3:avalonProposals.findIndex(element=>element.quest-1 == resultsArray.length && element.attempt == 1) != -1?2:1;
            }else{
                phase = 'execute';
                attempt = avalonProposals[avalonProposals.length-1].attempt
            }
        }
        if (successCount == 3){
            phase = 'killMerlin';
        }
        let proposedQuestsArray = [];
        let votesArray;
        let choicesArray;
        let q;
        let r;
        avalonProposals.forEach((element,index,arr)=>{
            q = [avalonProposals[index].vote1,avalonProposals[index].vote2,avalonProposals[index].vote3,avalonProposals[index].vote4,avalonProposals[index].vote5,avalonProposals[index].vote6,avalonProposals[index].vote7,avalonProposals[index].vote8,avalonProposals[index].vote9,avalonProposals[index].vote10]
            r = [avalonProposals[index].choice1,avalonProposals[index].choice2,avalonProposals[index].choice3,avalonProposals[index].choice4,avalonProposals[index].choice5]
            votesArray = q.filter(element=>element == "approve" || element == "reject");
            choicesArray = r.filter(element=>element && element != 'null');
            proposedQuestsArray.push({votesArray:votesArray.slice(),choicesArray:choicesArray.slice(),quest:avalonProposals[index].quest,attempt:avalonProposals[index].attempt,teamLeader:avalonProposals[index].teamleader,result:avalonProposals[index].result})
            q.splice(0,q.length);
            r.splice(0,r.length)
            votesArray.splice(0,votesArray.length);
            choicesArray.splice(0,choicesArray.length)
        })
        res.status(200).send({playerArray,resultsArray,proposedQuestsArray,teamLeader,quest,attempt,phase})
    },
    async createVotes(req,res,next){
        let db = req.app.get('db');
        let {room,quest,attempt,teamLeader,choice1,choice2,choice3,choice4,choice5,vote1,vote2,vote3,vote4,vote5,vote6,vote7,vote8,vote9,vote10,result} = req.body;
        await db.create_votes([room,quest,attempt,teamLeader,choice1,choice2,choice3,choice4,choice5,vote1,vote2,vote3,vote4,vote5,vote6,vote7,vote8,vote9,vote10,result])
        res.sendStatus(200);
    },
    async createExecutions(req,res,next){
        let db = req.app.get('db');
        let {room} = req.params;
        let {quest,choice1,choice2,choice3,choice4,choice5,result} = req.body;
        await db.create_executions([room,quest,choice1,choice2,choice3,choice4,choice5,result]);
        res.sendStatus(200);
    },
    async deleteGame(req,res,next){
        let db = req.app.get('db');
        let {room} = req.params;
        await db.delete_game([room]);
        res.sendStatus(200);
    }
}