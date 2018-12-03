const gameFunctions = require('./gameFunctions');
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
        let {room,player1name,player1identity,player2name,player2identity,player3name,player3identity,player4name,player4identity,player5name,player5identity,player6name,player6identity,player7name,player7identity,player8name,player8identity,player9name,player9identity,player10name,player10identity,teamLeader} = req.params;
        console.log('player1name:',player1name)
        console.log('teamLeader:',teamLeader)
        let db = req.app.get('db');
        await db.update_game_players([player1name,player1identity,player2name,player2identity,player3name,player3identity,player4name,player4identity,player5name,player5identity,player6name,player6identity,player7name,player7identity,player8name,player8identity,player9name,player9identity,player10name,player10identity,teamLeader,room])
        res.sendStatus(200);
    },
    async getInformation(req,res,next){
        let {room} = req.params;
        let db = req.app.get('db');
        let [avalonGamePlayers] = await db.get_avalon_game_players([room]);
        if (!avalonGamePlayers){return res.status(200).send({message:"There is no information"})}
        let a = [{name:avalonGamePlayers.player1name,identity:avalonGamePlayers.player1identity},{name:avalonGamePlayers.player2name,identity:avalonGamePlayers.player2identity},{name:avalonGamePlayers.player3name,identity:avalonGamePlayers.player3identity},{name:avalonGamePlayers.player4name,identity:avalonGamePlayers.player4identity},{name:avalonGamePlayers.player5name,identity:avalonGamePlayers.player5identity},{name:avalonGamePlayers.player6name,identity:avalonGamePlayers.player6identity},{name:avalonGamePlayers.player7name,identity:avalonGamePlayers.player7identity},{name:avalonGamePlayers.player8name,identity:avalonGamePlayers.player8identity},{name:avalonGamePlayers.player9name,identity:avalonGamePlayers.player9identity},{name:avalonGamePlayers.player10name,identity:avalonGamePlayers.player10identity}];
        let playerArray = a.filter(element=>element.identity && element.identity != 'null');
        playerArray.forEach(element=>{element.loyalty = element.identity == "Loyal Servant Of King Arthur" || element.identity == "Merlin" || element.identity == "Percival"?"good":"evil"})
        let avalonExecutions = await db.get_avalon_executions([room]);
        let b = [avalonExecutions[0]?avalonExecutions[0].result:null,avalonExecutions[1]?avalonExecutions[1].result:null,avalonExecutions[2]?avalonExecutions[2].result:null,avalonExecutions[3]?avalonExecutions[3].result:null,avalonExecutions[4]?avalonExecutions[4].result:null];
        let resultsArray = b.filter(element=>element == 'successful' || element == 'failed');
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
            index = avalonProposals.findIndex(element=>element.quest==resultsArray.length+1 && element.result == "approved");
            if (index == -1 ){
                phase = 'propose';
                attempt = avalonProposals.findIndex(element=>element.quest == resultsArray.length && element.attempt == 4) != -1?5:avalonProposals.findIndex(element=>element.quest == resultsArray.length && element.attempt == 3) != -1?4:avalonProposals.findIndex(element=>element.quest == resultsArray.length && element.attempt == 2) != -1?3:avalonProposals.findIndex(element=>element.quest == resultsArray.length && element.attempt == 1) != -1?2:1;
            }else{
                phase = 'execute';
                attempt = avalonProposals[avalonProposals.length-1].attempt
            }
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
        console.log('inside createVotes')
        let db = req.app.get('db');
        let {room,quest,attempt,teamLeader,choice1,choice2,choice3,choice4,choice5,vote1,vote2,vote3,vote4,vote5,vote6,vote7,vote8,vote9,vote10,result} = req.body;
        await db.create_votes([room,quest,attempt,teamLeader,choice1,choice2,choice3,choice4,choice5,vote1,vote2,vote3,vote4,vote5,vote6,vote7,vote8,vote9,vote10,result])
        res.sendStatus(200);
    },
    async createMatch(req,res,next){
        let db = req.app.get('db');
        let {matchName} = req.body;
        let foundMatch = await db.check_for_match([matchName]);
        if (foundMatch[0]) return res.status(200).send({message:'Match Already Exists.'});
        let [createdMatch] = await db.create_match([matchName]);
        res.status(200).send({message:'Match Created'});
    },
    async createPlayer(req,res,next) {
        let db = req.app.get('db');
        let {matchName, name, password, image} = req.body;
        let foundMatch = await db.check_for_match([matchName]);
        if (!foundMatch[0]) return res.status(200).send({message:'There is no such match.'});
        let [numberOfPlayers] = await db.get_number_of_players([matchName]);
        let {numberofplayers} = numberOfPlayers;
        if (numberofplayers == 10) {
            return res.status(200).send({message:'This game has the maximum number of players'});
        }else{
            switch(numberofplayers){
                case 0:
                await db.create_player_1([matchName,name,password,image]);
                return res.sendStatus(200);
                case 1:
                await db.create_player_2([matchName,name,password,image]);
                return res.sendStatus(200);
                case 2:
                await db.create_player_3([matchName,name,password,image]);
                return res.sendStatus(200);
                case 3:
                await db.create_player_4([matchName,name,password,image]);
                return res.sendStatus(200);
                case 4:
                await db.create_player_5([matchName,name,password,image]);
                return res.sendStatus(200);
                case 5:
                await db.create_player_6([matchName,name,password,image]);
                return res.sendStatus(200);
                case 6:
                await db.create_player_7([matchName,name,password,image]);
                return res.sendStatus(200);
                case 7:
                await db.create_player_8([matchName,name,password,image]);
                return res.sendStatus(200);
                case 8:
                await db.create_player_9([matchName,name,password,image]);
                return res.sendStatus(200);
                case 9:
                await db.create_player_10([matchName,name,password,image]);
                return res.sendStatus(200);
                default:
                return res.status(400).send({message:"unknown case"});
            }
        }
    },
    async getPlayers(req,res,next){
        let {matchName} = req.params;
        let db = req.app.get('db');
        let foundMatch = await db.check_for_match([matchName]);
        if (!foundMatch[0]) return res.status(200).send({message:'There is no such match.'});
        res.status(200).send(foundMatch[0]);
    },
    async gameStarted(req,res,next){
        let {matchName}=req.params;
        let db = req.app.get('db');
        let [val] = await db.game_started([matchName]);
        res.status(200).send({gameStarted:val});
    },
    async gameStartedTrue(req,res,next){
        console.log('inside function')
        let {matchName} = req.body;
        let db = req.app.get('db');
        await db.game_started_true([matchName]);
        return res.sendStatus(200);
    },
    async getIdentities(req,res,next){
        let db = req.app.get('db');
        let {matchName} = req.params;
        let identities = await db.get_identities([matchName]);
        res.status(200).send(identities);
    },
    async setupIdentities(req,res,next){
        let {matchName,merlinassassin,percival,morgana,mordred,oberon} = req.body;
        let db = req.app.get('db');
        let foundMatch = await db.check_for_match([matchName]);
        if (!foundMatch[0]) return res.status(200).send({message:'There is no such match.'});
        let [numberOfPlayers] = await db.get_number_of_players([matchName]);
        let {numberofplayers} = numberOfPlayers;
    
        let identityArray = gameFunctions.setupIdentities(numberofplayers,merlinassassin,percival,morgana,mordred,oberon);
        console.log('the number of players is',numberofplayers)
        console.log('identityArray:',identityArray)
        switch(numberofplayers){
            case 10:
            await db.create_identities_10([matchName,identityArray[0].loyalty,identityArray[0].identity,identityArray[1].loyalty,identityArray[1].identity,identityArray[2].loyalty,identityArray[2].identity,identityArray[3].loyalty,identityArray[3].identity,identityArray[4].loyalty,identityArray[4].identity,identityArray[5].loyalty,identityArray[5].identity,identityArray[6].loyalty,identityArray[6].identity,identityArray[7].loyalty,identityArray[7].identity,identityArray[8].loyalty,identityArray[8].identity,identityArray[9].loyalty,identityArray[9].identity])
            return res.sendStatus(200);
            case 9:
            await db.create_identities_9([matchName,identityArray[0].loyalty,identityArray[0].identity,identityArray[1].loyalty,identityArray[1].identity,identityArray[2].loyalty,identityArray[2].identity,identityArray[3].loyalty,identityArray[3].identity,identityArray[4].loyalty,identityArray[4].identity,identityArray[5].loyalty,identityArray[5].identity,identityArray[6].loyalty,identityArray[6].identity,identityArray[7].loyalty,identityArray[7].identity,identityArray[8].loyalty,identityArray[8].identity])
            return res.sendStatus(200);
            case 8:
            await db.create_identities_8([matchName,identityArray[0].loyalty,identityArray[0].identity,identityArray[1].loyalty,identityArray[1].identity,identityArray[2].loyalty,identityArray[2].identity,identityArray[3].loyalty,identityArray[3].identity,identityArray[4].loyalty,identityArray[4].identity,identityArray[5].loyalty,identityArray[5].identity,identityArray[6].loyalty,identityArray[6].identity,identityArray[7].loyalty,identityArray[7].identity])
            return res.sendStatus(200);
            case 7:
            await db.create_identities_7([matchName,identityArray[0].loyalty,identityArray[0].identity,identityArray[1].loyalty,identityArray[1].identity,identityArray[2].loyalty,identityArray[2].identity,identityArray[3].loyalty,identityArray[3].identity,identityArray[4].loyalty,identityArray[4].identity,identityArray[5].loyalty,identityArray[5].identity,identityArray[6].loyalty,identityArray[6].identity])
            return res.sendStatus(200);
            case 6:
            await db.create_identities_6([matchName,identityArray[0].loyalty,identityArray[0].identity,identityArray[1].loyalty,identityArray[1].identity,identityArray[2].loyalty,identityArray[2].identity,identityArray[3].loyalty,identityArray[3].identity,identityArray[4].loyalty,identityArray[4].identity,identityArray[5].loyalty,identityArray[5].identity])
            return res.sendStatus(200);
            case 5:
            console.log('i am here')
            await db.create_identities_5([matchName,identityArray[0].loyalty,identityArray[0].identity,identityArray[1].loyalty,identityArray[1].identity,identityArray[2].loyalty,identityArray[2].identity,identityArray[3].loyalty,identityArray[3].identity,identityArray[4].loyalty,identityArray[4].identity])
            console.log('i is here')
            return res.sendStatus(200);
            default:
            return res.status(400).send({message:'unknown error'});
        }
    },
    async getMatch(req,res,next){
        let {matchName} = req.params;
        let db = req.app.get('db');
        let foundMatch = await db.check_for_match([matchName]);
        if (!foundMatch[0]) return res.status(200).send({message:'There is no such match.'});
        return res.status(200).send({message:'Match Found'});
    },
    async createResultsRow(req,res,next){
        let {matchName,numberOfPlayers} = req.body;
        let db = req.app.get('db');
        await db.create_results_row([matchName,Math.floor(Math.random() * numberOfPlayers)+1]);
        return res.sendStatus(200);
    },
    async createRowQuest1(req,res,next){
        let {matchName} = req.body;
        let db = req.app.get('db')
        await db.create_row_quest1([matchName]);
        return res.sendStatus(200);
    },
    async createRowQuest2(req,res,next){
        let {matchName} = req.body;
        let db = req.app.get('db')
        await db.create_row_quest2([matchName]);
        return res.sendStatus(200);
    },
    async createRowQuest3(req,res,next){
        let {matchName} = req.body;
        let db = req.app.get('db')
        await db.create_row_quest3([matchName]);
        return res.sendStatus(200);
    },
    async createRowQuest4(req,res,next){
        let {matchName} = req.body;
        let db = req.app.get('db')
        await db.create_row_quest4([matchName]);
        return res.sendStatus(200);
    },
    async createRowQuest5(req,res,next){
        let {matchName} = req.body;
        let db = req.app.get('db')
        await db.create_row_quest5([matchName]);
        return res.sendStatus(200);
    },
    async getPhase(req,res,next){
        let {matchName} = req.params;
        let db = req.app.get('db');
        let result = await db.get_phase([matchName]);
        res.status(200).send(result);
    },
    async changePhase(req,res,next){
        let {matchName,phase} = req.params;
        let db = req.app.get('db');
        await db.change_phase([phase, matchName]);
        res.sendStatus(200);
    },
    async getAllBasicGameInfo(req,res,next){
        let {matchName} = req.params;
        let db = req.app.get('db');
        let [players] = await db.get_players([matchName]);
        let [identities] = await db.get_identities([matchName]);
        let [results] = await db.get_results([matchName]);
        let [execution_quest1] = await db.get_execution_quest1([matchName]);
        let [execution_quest2] = await db.get_execution_quest2([matchName]);
        let [execution_quest3] = await db.get_execution_quest3([matchName]);
        let [execution_quest4] = await db.get_execution_quest4([matchName]);
        let [execution_quest5] = await db.get_execution_quest5([matchName]);
        let obj = {players:players,identities:identities,results:results,execution_quest1,execution_quest2,execution_quest3,execution_quest4,execution_quest5};
        res.status(200).send(obj);
    },
    async editPlayersOnQuest(req,res,next){
        let {questPlayer1,questPlayer2,questPlayer3,questPlayer4,questPlayer5,matchName,questNumber} = req.params;
        console.log('questPlayer1:',questPlayer1);
        console.log('questPlayer2:',questPlayer2);
        console.log('questPlayer3:',questPlayer3);
        console.log('questPlayer4:',questPlayer4);
        console.log('questPlayer5:',questPlayer5);
        let playersSoFar = !questPlayer1 || (questPlayer1 =='null') || (questPlayer1 == null)?0:!questPlayer2 || (questPlayer2 =='null') || (questPlayer2 == null)?1:!questPlayer3 || (questPlayer3 =='null') || (questPlayer3 == null)?2:!questPlayer4 || (questPlayer4 =='null') || (questPlayer4 == null)?3:!questPlayer5 || (questPlayer5 =='null') || (questPlayer5 == null)?4:5;
        console.log('playersSoFar:',playersSoFar)
        let db = req.app.get('db');
        await db.update_players_received([playersSoFar,matchName]);
        if (questNumber == 1) await db.update_players_on_quest1([!questPlayer1 || (questPlayer1 =='null') || (questPlayer1 == null)?0:questPlayer1,!questPlayer2 || (questPlayer2 =='null') || (questPlayer2 == null)?0:questPlayer2,!questPlayer3 || (questPlayer3 =='null') || (questPlayer3 == null)?0:questPlayer3,matchName])
        if (questNumber == 2) await db.update_players_on_quest2([!questPlayer1 || (questPlayer1 =='null') || (questPlayer1 == null)?0:questPlayer1,!questPlayer2 || (questPlayer2 =='null') || (questPlayer2 == null)?0:questPlayer2,!questPlayer3 || (questPlayer3 =='null') || (questPlayer3 == null)?0:questPlayer3,!questPlayer4 || (questPlayer4 == 'null') || (questPlayer4 == null),matchName])
        if (questNumber == 3) await db.update_players_on_quest3([!questPlayer1 || (questPlayer1 =='null') || (questPlayer1 == null)?0:questPlayer1,!questPlayer2 || (questPlayer2 =='null') || (questPlayer2 == null)?0:questPlayer2,!questPlayer3 || (questPlayer3 =='null') || (questPlayer3 == null)?0:questPlayer3,!questPlayer4 || (questPlayer4 == 'null') || (questPlayer4 == null),matchName])
        if (questNumber == 4) await db.update_players_on_quest4([!questPlayer1 || (questPlayer1 =='null') || (questPlayer1 == null)?0:questPlayer1,!questPlayer2 || (questPlayer2 =='null') || (questPlayer2 == null)?0:questPlayer2,!questPlayer3 || (questPlayer3 =='null') || (questPlayer3 == null)?0:questPlayer3,!questPlayer4 || (questPlayer4 == 'null') || (questPlayer4 == null),!questPlayer5 || (questPlayer5 == 'null') || (questPlayer5 == null)?0:questPlayer5,matchName])
        if (questNumber == 5) await db.update_players_on_quest5([!questPlayer1 || (questPlayer1 =='null') || (questPlayer1 == null)?0:questPlayer1,!questPlayer2 || (questPlayer2 =='null') || (questPlayer2 == null)?0:questPlayer2,!questPlayer3 || (questPlayer3 =='null') || (questPlayer3 == null)?0:questPlayer3,!questPlayer4 || (questPlayer4 == 'null') || (questPlayer4 == null),!questPlayer5 || (questPlayer5 == 'null') || (questPlayer5 == null)?0:questPlayer5,matchName])
        res.sendStatus(200);
    },
    async createVoteColumn(req,res,next){
        let {attempt,quest,matchName,playeronquest1,playeronquest2,playeronquest3,playeronquest4,playeronquest5,teamleader}=req.body;
        let db = req.app.get('db');
        let a = await db.check_for_column([quest,attempt,matchName]);
        if (a[0])return res.sendStatus(200);
        if (!playeronquest5 || playeronquest5 == 0 || playeronquest5 == null || playeronquest5 == 'null'){
            if (!playeronquest4 || playeronquest4 == 0 || playeronquest4 == null || playeronquest4 == 'null'){
                await db.create_proposal3([quest,attempt,matchName,teamleader,playeronquest1,playeronquest2,playeronquest3]);
            }else{
                await db.create_proposal4([quest,attempt,matchName,teamleader,playeronquest1,playeronquest2,playeronquest3,playeronquest4]);
            }
        }else{
            await db.create_proposal5([quest,attempt,matchName,teamleader,playeronquest1,playeronquest2,playeronquest3,playeronquest4,playeronquest5]);
        }
        res.sendStatus(200);
    },
    async castVote(req,res,next){
        let {attempt,quest,matchName,vote,playerNumber}=req.body;
        let db = req.app.get('db');
        if (playerNumber == 1) {
            await db.cast_vote_player1([quest,attempt,vote,matchName]);
        }else if (playerNumber == 2) {
            await db.cast_vote_player2([quest,attempt,vote,matchName]);
        }else if (playerNumber == 3) {
            await db.cast_vote_player3([quest,attempt,vote,matchName]);
        }else if (playerNumber == 4) {
            await db.cast_vote_player4([quest,attempt,vote,matchName]);
        }else if (playerNumber == 5) {
            await db.cast_vote_player5([quest,attempt,vote,matchName]);
        }else if (playerNumber == 6) {
            await db.cast_vote_player6([quest,attempt,vote,matchName]);
        }else if (playerNumber == 7) {
            await db.cast_vote_player7([quest,attempt,vote,matchName]);
        }else if (playerNumber == 8) {
            await db.cast_vote_player8([quest,attempt,vote,matchName]);
        }else if (playerNumber == 9) {
            await db.cast_vote_player9([quest,attempt,vote,matchName]);
        }else if (playerNumber == 10) {
            await db.cast_vote_player10([quest,attempt,vote,matchName]);
        }else {}
        res.sendStatus(200)//.catch(res.status(400).send({message:'error'}));
    },
    async hasVoted(req,res,next){
        let {attempt,quest,matchName,playerNumber} = req.params;
        let db = req.app.get('db');
        let columnName = 'player' + playerNumber + 'vote';
        let tableName = 'avalon_votes_quest' + quest + '_proposal' + attempt;
        let myValue = await db.check_for_vote([columnName,tableName,matchName]);
        if (!myValue[0]) return res.status(200).send(false);
        res.status(200).send(true).catch(res.status(400).send({message:'error'}));
    },
    async getProposedQuest(req,res,next){
        let {attempt,quest,matchName}=req.params;
        let db = req.app.get('db');
        let a = await db.check_for_column([quest,attempt,matchName]);
        res.status(200).send(a[0]);
    },
    async getQuestAndAttempt(req,res,next){
        let {matchName} = req.params;
        let db = req.app.get('db');
        let a = await db.obtain([matchName]);
        res.status(200).send(a[0]);
    },
    async getVoteEvaluationNumbers(req,res,next){
        let {matchName} = req.params;
        let db = req.app.get('db');
        await db.increase_number_of_votes([matchName]);
        let [a] = await db.get_num_votes_and_num_players([matchName]);
        console.log('a.numberofplayers',a.numberofplayers)
        let equal = a.numberofplayers == a.votesreceived;
        res.status(200).send(equal)//.catch(res.status(400).send({message:'error'}));
    },
    async increaseNumberOfVotes(req,res,next){
        let {matchName} = req.params;
        let db = req.app.get('db');
        await db.increase_number_of_votes([matchName]);
        res.sendStatus(200)//.catch(res.status(400).send({message:'error'}));
    },
    async SwitchOverWhenDoneVoting(req,res,next){
        let {matchName,quest,attempt} = req.params;
        let db = req.app.get('db');
        console.log('inside this function');
        let [a]= await db.check_for_column([parseInt(quest, 10),parseInt(attempt, 10),matchName]);
        console.log('better yet')
        let [b] = await db.get_num_votes_and_num_players([matchName]);
        console.log('A');
        let numberOfApproves = 0;
        let numberOfRejects = 0;
        let votesArray = [a.player1vote,a.player2vote,a.player3vote,a.player4vote,a.player5vote];
        if (b.numberofplayers > 5)votesArray.push(a.player6vote);
        if (b.numberofplayers > 6)votesArray.push(a.player7vote);
        if (b.numberofplayers > 7)votesArray.push(a.player8vote);
        if (b.numberofplayers > 8)votesArray.push(a.player9vote);
        if (b.numberofplayers > 9)votesArray.push(a.player10vote);
        let result;
        votesArray.forEach(element=>{
            if (element=='approve'){numberOfApproves++}else if (element=='reject'){numberOfRejects++}
        })
        if (numberOfApproves > numberOfRejects){result = 'approved'}else{result = 'rejected'};
        console.log('approves:',numberOfApproves)
        console.log('rejects:',numberOfRejects)
        let [c] = await db.get_team_leader([matchName]);
        let newTeamLeader = c.currentteamleader == b.numberofplayers?1:c.currentteamleader+1;
        db.set_vote_result([parseInt(quest, 10),parseInt(attempt, 10),result,matchName]);
        console.log('B');
        await db.set_team_leader([parseInt(newTeamLeader, 10),matchName]);
        console.log('C');
        await db.reset_votes([matchName]);
        console.log('D');
        if (result == 'approved'){
            await db.change_phase(['execute', matchName]);
        }
        if (result == 'rejected'){
            console.log('E')
            await db.change_phase(['propose', matchName]);
            console.log('F')
            await db.reset_players_received([matchName]);
            console.log('G')
            await db.increment_attempt([matchName]);
            console.log('H')
            if (quest == 1){
                await db.reset_players_on_quest3([1,matchName]);
            }else if (quest == 2){
                await db.reset_players_on_quest4([2,matchName]);
            }else if (quest == 3){
                await db.reset_players_on_quest4([3,matchName]);
            }else if (quest == 4){
                await db.reset_players_on_quest5([4,matchName]);
            }else {
                await db.reset_players_on_quest5([5,matchName]);
            }
            
            console.log('I')
        }
        res.sendStatus(200);
    },
    async fix(req,res,next){
        let {quest,attempt,playeronquest1,playeronquest2,playeronquest3,playeronquest4,playeronquest5,matchName} = req.params;
        let db = req.app.get('db');
        await db.fix([quest,attempt,playeronquest1,playeronquest2,playeronquest3,playeronquest4,playeronquest5,matchName]);
        res.sendStatus(200);
    },
    async getQuest(req,res,next){
        let {matchName} = req.params;
        let db = req.app.get('db');
        let [quest] = await db.get_quest([matchName]);
        res.status(200).send(quest);
    },
    async getCurrentExecution(req,res,next){
        let {matchName,quest} = req.params;
        let db = req.app.get('db');
        let [currentExecution] = await db.get_current_execution([parseInt(quest, 10), matchName]);
        let playersOnQuestArray = ["not on quest","not on quest","not on quest","not on quest","not on quest","not on quest","not on quest","not on quest","not on quest","not on quest"];
        let executionsArray = ["not on quest","not on quest","not on quest","not on quest","not on quest","not on quest","not on quest","not on quest","not on quest","not on quest"];
        playersOnQuestArray[currentExecution.playeronquest1 - 1] = "on quest"; executionsArray[currentExecution.playeronquest1 - 1] = currentExecution.player1execution; playersOnQuestArray[currentExecution.playeronquest2 - 1] = "on quest"; executionsArray[currentExecution.playeronquest2 - 1] = currentExecution.player2execution; 
        if (currentExecution.playeronquest3  && currentExecution.playeronquest3 != 0 && currentExecution.playeronquest3 != 'null'){playersOnQuestArray[currentExecution.playeronquest3 - 1] = "on quest"; executionsArray[currentExecution.playeronquest3 - 1] = currentExecution.player3execution;}
        if (currentExecution.playeronquest4  && currentExecution.playeronquest4 != 0 && currentExecution.playeronquest4 != 'null'){playersOnQuestArray[currentExecution.playeronquest4 - 1] = "on quest"; executionsArray[currentExecution.playeronquest4 - 1] = currentExecution.player4execution;}
        if (currentExecution.playeronquest5  && currentExecution.playeronquest5 != 0 && currentExecution.playeronquest5 != 'null'){playersOnQuestArray[currentExecution.playeronquest5 - 1] = "on quest"; executionsArray[currentExecution.playeronquest5 - 1] = currentExecution.player5execution;}
        res.status(200).send({playersOnQuestArray,executionsArray});
    },
    async submitExecution(req,res,next){
        let {quest,execution,playerNumber,matchName} = req.params;
        let db = req.app.get('db');
        let b;
        if (execution == 'fail'){
            b = await db.submit_fail([parseInt(quest, 10),parseInt(playerNumber,10),matchName]);
        }else if (execution == 'success'){
            b = await db.submit_success([parseInt(quest, 10),parseInt(playerNumber,10),matchName]);
        }
        let numberOfExecutions = b[0].numberofsuccesses + b[0].numberoffails;
        let [c] = await db.get_number_of_players([matchName]);
        let numberOfPlayers = c.numberofplayers;
        let numberOfExecutionsNeeded = (quest == 1 && numberOfPlayers < 8) || (quest == 3 && numberOfPlayers == 5)?2:(numberOfPlayers > 7 && quest== 1) || (numberOfPlayers < 8 && quest == 2) || (numberOfPlayers == 7 && quest == 3) || (numberOfPlayers < 7 && quest == 4) || (numberOfPlayers == 5 && quest == 5)?3: (numberOfPlayers > 7 && quest == 2) || (numberOfPlayers > 7 && quest == 3) || (numberOfPlayers == 6 && quest == 3) || (numberOfPlayers == 7 && quest == 4) || (numberOfPlayers == 6 && quest == 5) || (numberOfPlayers == 7 && quest == 5)?4:5;
        let d;
        if (numberOfExecutionsNeeded == numberOfExecutions){
            if ((quest == 4 && numberOfPlayers > 6 && b[0].numberoffails > 1) || b[0].numberoffails > 0){
                await db.set_quest_status([parseInt(quest, 10),'fail',matchName]);
                d = await db.b_failure([matchName]);
                console.log('d:',d)
                if (d[0].numberoffailedquests == 3){

                }else{
                    await db.create_row_quest([parseInt(parseInt(quest,10)+1),matchName]);
                    await db.new_quest([matchName]);
                }
            }else{
                await db.set_quest_status([parseInt(quest, 10),'success',matchName]);
                d = await db.b_successful([matchName]);
                console.log('d:',d)
                if (d[0].numberofsuccessfulquests == 3){
                    
                }else{
                    await db.create_row_quest([parseInt(parseInt(quest,10)+1),matchName]);
                    await db.new_quest([matchName]);
                }
            }
            return res.status(200).send(true);
        }
        return res.status(200).send(false);
    },
    async getQuestAttemptTeamleader(req,res,next){
        let {matchName} = req.params;
        let db = req.app.get('db');
        let [stuff] = await db.quest_attempt_leader([matchName]);
        res.status(200).send(stuff);
    },
    async adjustQuest(req,res,next){
        let {onArray,quest,matchName} = req.params;
        let db = req.app.get('db');
        let newOnArray = [];
        for (i = 0; i < onArray.length; i++){
            if (onArray[i] != ','){
                newOnArray.push(parseInt(onArray[i],10));
            }
        }
        let containsAZero = false;
        let index = newOnArray.findIndex(element=>element==0);
        if (index != -1){
            newOnArray.splice(index,1);
            newOnArray[index-1] = 10;
        }
        input1 = newOnArray.length > 0? newOnArray[0]:null;
        input2 = newOnArray.length > 1? newOnArray[1]:null;
        input3 = newOnArray.length > 2? newOnArray[2]:null;
        input4 = newOnArray.length > 3? newOnArray[3]:null;
        input5 = newOnArray.length > 4? newOnArray[4]:null;
        await db.update_players_received([newOnArray.length,matchName]);
        if (quest == 1){
            await db.a3([parseInt(quest,10),input1,input2,input3,matchName]);
        }else if (quest < 4){
            await db.a4([parseInt(quest,10),input1,input2,input3,input4,matchName]);
        }else{
            await db.a5([parseInt(quest,10),input1,input2,input3,input4,input5,matchName])
        }
        res.sendStatus(200);
    }
}