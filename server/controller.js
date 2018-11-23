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
    }
}