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
    startMatch: async (req,res,next)=>{
        let db = req.app.get('db');
        let match = req.body;
        let matchname = match.matchName;
        let player1name = match.playerArray[0].name;
        let player1hash = match.playerArray[0].hash;
        let player1image = match.playerArray[0].image;
        let player1identity = match.playerArray[0].identity;
        let player1loyalty = match.playerArray[0].loyalty;
        let player2name = match.playerArray[1].name
        let player2hash = match.playerArray[1].hash;
        let player2image = match.playerArray[1].image;
        let player2identity = match.playerArray[1].identity;
        let player2loyalty = match.playerArray[1].loyalty;
        let player3name = match.playerArray[2].name
        let player3hash = match.playerArray[2].hash;
        let player3image = match.playerArray[2].image;
        let player3identity = match.playerArray[2].identity;
        let player3loyalty = match.playerArray[2].loyalty;
        let player4name = match.playerArray[3].name
        let player4hash = match.playerArray[3].hash;
        let player4image = match.playerArray[3].image;
        let player4identity = match.playerArray[3].identity;
        let player4loyalty = match.playerArray[3].loyalty;
        let player5name = match.playerArray[4].name
        let player5hash = match.playerArray[4].hash;
        let player5image = match.playerArray[4].image;
        let player5identity = match.playerArray[4].identity;
        let player5loyalty = match.playerArray[4].loyalty;
        let player6name = match.playerArray[5].name
        let player6hash = match.playerArray[5].hash;
        let player6image = match.playerArray[5].image;
        let player6identity = match.playerArray[5].identity;
        let player6loyalty = match.playerArray[5].loyalty;
        let player7name = match.playerArray[6].name
        let player7hash = match.playerArray[6].hash;
        let player7image = match.playerArray[6].image;
        let player7identity = match.playerArray[6].identity;
        let player7loyalty = match.playerArray[6].loyalty;
        let player8name = match.playerArray[7].name
        let player8hash = match.playerArray[7].hash;
        let player8image = match.playerArray[7].image;
        let player8identity = match.playerArray[7].identity;
        let player8loyalty = match.playerArray[7].loyalty;
        let player9name = match.playerArray[8].name
        let player9hash = match.playerArray[8].hash;
        let player9image = match.playerArray[8].image;
        let player9identity = match.playerArray[8].identity;
        let player9loyalty = match.playerArray[8].loyalty;
        let player10name = match.playerArray[9].name
        let player10hash = match.playerArray[9].hash;
        let player10image = match.playerArray[9].image;
        let player10identity = match.playerArray[9].identity;
        let player10loyalty = match.playerArray[9].loyalty;
        let indexofteamleader = match.indexOfTeamLeader;
        let currentquest = match.currentQuest;
        let playingwithmerlin = match.playingWithMerlin;
        let ladyofthelake = false;
        let numberoffailedquests = match.numberOfFailedQuests;
        let numberofsuccessfulquests = match.numberOfSuccessfulQuests;
        let statusofquest1 = "to be determined";
        let statusofquest2 = "to be determined";
        let statusofquest3 = "to be determined";
        let statusofquest4 = "to be determined";
        let statusofquest5 = "to be determined";
        let numberofplayers = match.playerArray.length;
        let myMatch = await db.start_match([
            matchname,
            player1name,
            player1hash,
            player1image,
            player1identity,
            player1loyalty,
            player2name,
            player2hash,
            player2image,
            player2identity,
            player2loyalty,
            player3name,
            player3hash,
            player3image,
            player3identity,
            player3loyalty,
            player4name,
            player4hash,
            player4image,
            player4identity,
            player4loyalty,
            player5name,
            player5hash,
            player5image,
            player5identity,
            player5loyalty,
            player6name,
            player6hash,
            player6image,
            player6identity,
            player6loyalty,
            player7name,
            player7hash,
            player7image,
            player7identity,
            player7loyalty,
            player8name,
            player8hash,
            player8image,
            player8identity,
            player8loyalty,
            player9name,
            player9hash,
            player9image,
            player9identity,
            player9loyalty,
            player10name,
            player10hash,
            player10image,
            player10identity,
            player10loyalty,
            indexofteamleader,
            currentquest,
            playingwithmerlin,
            ladyofthelake,
            numberoffailedquests,
            numberofsuccessfulquests,
            statusofquest1,
            statusofquest2,
            statusofquest3,
            statusofquest4,
            statusofquest5,
            numberofplayers
        ]);
        res.status(200).send(myMatch);
    }
}