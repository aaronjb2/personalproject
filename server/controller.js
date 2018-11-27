const gameFunctions = require('./gameFunctions');
const socket = require("socket.io");
const io = socket();

module.exports = {
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
            await db.create_identities_5([matchName,identityArray[0].loyalty,identityArray[0].identity,identityArray[1].loyalty,identityArray[1].identity,identityArray[2].loyalty,identityArray[2].identity,identityArray[3].loyalty,identityArray[3].identity,identityArray[4].loyalty,identityArray[4].identity])
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
        await db.create_results_row([matchName,Math.random()*(numberOfPlayers-1)+1]);
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
        res.sendStatus(200).catch(res.status(400).send({message:'error'}));
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
        let equal = a.numberofplayers == a.votesreceived;
        res.status(200).send(equal).catch(res.status(400).send({message:'error'}));
    },
    async increaseNumberOfVotes(req,res,next){
        let {matchName} = req.params;
        let db = req.app.get('db');
        await db.increase_number_of_votes([matchName]);
        res.sendStatus(200).catch(res.status(400).send({message:'error'}));
    }
}