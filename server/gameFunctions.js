identityConstants = require('./identityConstants.js')

var shuffle = array => {
    var a;
    var b;
    var randomNumber;
    for (i = 0; i < array.length; i++){
        randomNumber = Math.floor((Math.random() * array.length))
        a = Object.assign({},array[i]);
        b = Object.assign({},array[randomNumber]);
        for (var prop in array[i]) {if (array[i].hasOwnProperty(prop)) {delete array[i][prop]}}
        for (var prop in array[randomNumber]) {if (array[randomNumber].hasOwnProperty(prop)) {delete array[randomNumber][prop]}}
        array[i] = Object.assign({},randomNumber==i?a:b);
        array[randomNumber] = Object.assign({},i==randomNumber?b:a);
        for (var prop in a) {if (a.hasOwnProperty(prop)) {delete a[prop]}}
        for (var prop in b) {if (b.hasOwnProperty(prop)) {delete b[prop]}}
    }
    return array;
}

module.exports={
    createMatch:matchName=>{
        return {
            matchName:matchName,
            playerArray:[]
        }
    },
    setupIdentities:(numberOfPlayers,merlinAssassin,percival,morgana,mordred,oberon)=>{
        /*
            Values contained by the match object after this function will be:

            matchName-this will be the same as the room.
            playerArray-each player in the array has their id, name, image, loyalty, and identity
            quantityForQuests=an array containing the quantity of people needed for each quest
            failsNeeded-a 5 element array, the values represent the number of fails needed for each quest
            numberOfFailedQuests-if this number hits 3, evil wins
            numberOfSuccesfulQuests-if this number hits 3, good wins, unless assassin stabs Merlin
            playingWithMerlin-a boolean that will tell the game if an attempt to assassinate Merlin is necessary
            indexOfTeamLeader-the index of the person in the playerArray that's team leader
            currentQuest-the quest number the game is currently on
            votingHistoryArray
            questHistoryArray

        */
        let numberOfEvilPlayers = numberOfPlayers % 3 < 2? Math.round(numberOfPlayers / 3)+1: Math.round(numberOfPlayers / 3 + 1);
        let identityArray = [];
        //match.quantityForQuests = match.playerArray.length == 5?[2,3,2,3,3]:match.playerArray.length == 6?[2,3,4,3,4]:match.playerArray.length == 7?[2,3,3,4,4]:[3,4,4,5,5];
        //match.failsNeeded = match.playerArray.length > 6? [1,1,1,2,1]:[1,1,1,1,1];
        //match.numberOfFailedQuests = 0;
        //match.numberOfSuccessfulQuests = 0;
        //match.indexOfTeamLeader = Math.floor((Math.random() * match.playerArray.length));
        //match.currentQuest = 1;
        //match.votingHistoryArray = [];
        //match.questHistoryArray = [];
        if (!merlinAssassin){
            //match.playingWithMerlin = false;
            identityArray.push(oberon?Object.assign({},identityConstants.OBERON):Object.assign({},identityConstants.MINION_OF_MORDRED));
            for (i = 0; i < numberOfEvilPlayers - 1; i++){
                identityArray.push(Object.assign({},identityConstants.MINION_OF_MORDRED));
            }
            for (i = 0; i < numberOfPlayers - numberOfEvilPlayers;i++){
                identityArray.push(Object.assign({},identityConstants.LOYAL_SERVANT_OF_KING_ARTHUR));
            }
        }else{
            //match.playingWithMerlin = true;
            identityArray.push(Object.assign({},identityConstants.MERLIN));
            identityArray.push(Object.assign({},identityConstants.ASSASSIN));
            identityArray.push(percival?Object.assign({},identityConstants.PERCIVAL):Object.assign({},identityConstants.LOYAL_SERVANT_OF_KING_ARTHUR));
            identityArray.push(Object.assign({},identityConstants.LOYAL_SERVANT_OF_KING_ARTHUR));
            switch (numberOfPlayers) {
                case 5:
                identityArray.push(morgana && percival?Object.assign({},identityConstants.MORGANA):mordred?Object.assign({},identityConstants.MORDRED):oberon?Object.assign({},identityConstants.OBERON):Object.assign({},identityConstants.MINION_OF_MORDRED));
                break;
                case 6:
                identityArray.push(Object.assign({},identityConstants.LOYAL_SERVANT_OF_KING_ARTHUR));
                identityArray.push(morgana && percival?Object.assign({},identityConstants.MORGANA):mordred?Object.assign({},identityConstants.MORDRED):oberon?Object.assign({},identityConstants.OBERON):Object.assign({},identityConstants.MINION_OF_MORDRED));
                break;
                case 7:
                identityArray.push(Object.assign({},identityConstants.LOYAL_SERVANT_OF_KING_ARTHUR));
                if (!oberon) {
                    identityArray.push(morgana && percival?Object.assign({},identityConstants.MORGANA):Object.assign({},identityConstants.MINION_OF_MORDRED));
                    identityArray.push(mordred?Object.assign({},identityConstants.MORDRED):Object.assign({},identityConstants.MINION_OF_MORDRED));
                }else{
                    identityArray.push(morgana && percival?Object.assign({},identityConstants.MORGANA):Object.assign({},identityConstants.OBERON));
                    identityArray.push(mordred?Object.assign({},identityConstants.MORDRED):morgana?Object.assign({},identityConstants.OBERON):Object.assign({},identityConstants.MINION_OF_MORDRED));
                }
                break;
                case 8:
                identityArray.push(Object.assign({},identityConstants.LOYAL_SERVANT_OF_KING_ARTHUR));
                identityArray.push(Object.assign({},identityConstants.LOYAL_SERVANT_OF_KING_ARTHUR));
                if (!oberon) {
                    identityArray.push(morgana && percival?Object.assign({},identityConstants.MORGANA):Object.assign({},identityConstants.MINION_OF_MORDRED));
                    identityArray.push(mordred?Object.assign({},identityConstants.MORDRED):Object.assign({},identityConstants.MINION_OF_MORDRED));
                }else{
                    identityArray.push(morgana && percival?Object.assign({},identityConstants.MORGANA):Object.assign({},identityConstants.OBERON));
                    identityArray.push(mordred?Object.assign({},identityConstants.MORDRED):morgana?Object.assign({},identityConstants.OBERON):Object.assign({},identityConstants.MINION_OF_MORDRED));
                }
                break;
                case 9:
                identityArray.push(Object.assign({},identityConstants.LOYAL_SERVANT_OF_KING_ARTHUR));
                identityArray.push(Object.assign({},identityConstants.LOYAL_SERVANT_OF_KING_ARTHUR));
                identityArray.push(Object.assign({},identityConstants.LOYAL_SERVANT_OF_KING_ARTHUR));
                if (!oberon) {
                    identityArray.push(morgana && percival?Object.assign({},identityConstants.MORGANA):Object.assign({},identityConstants.MINION_OF_MORDRED));
                    identityArray.push(mordred?Object.assign({},identityConstants.MORDRED):Object.assign({},identityConstants.MINION_OF_MORDRED));
                }else{
                    identityArray.push(morgana && percival?Object.assign({},identityConstants.MORGANA):Object.assign({},identityConstants.OBERON));
                    identityArray.push(mordred?Object.assign({},identityConstants.MORDRED):morgana?Object.assign({},identityConstants.OBERON):Object.assign({},identityConstants.MINION_OF_MORDRED));
                }
                break;
                case 10:
                identityArray.push(Object.assign({},identityConstants.LOYAL_SERVANT_OF_KING_ARTHUR));
                identityArray.push(Object.assign({},identityConstants.LOYAL_SERVANT_OF_KING_ARTHUR));
                identityArray.push(Object.assign({},identityConstants.LOYAL_SERVANT_OF_KING_ARTHUR));
                identityArray.push(morgana && percival?Object.assign({},identityConstants.MORGANA):Object.assign({},identityConstants.MINION_OF_MORDRED));
                identityArray.push(mordred?Object.assign({},identityConstants.MORDRED):Object.assign({},identityConstants.MINION_OF_MORDRED));
                identityArray.push(oberon?Object.assign({},identityConstants.OBERON):Object.assign({},identityConstants.MINION_OF_MORDRED));
                break;
                default:

                break;
            }
        }
        identityArray = shuffle(identityArray);
        // for (i = 0; i < numberOfPlayers; i++){
        //     match.playerArray[i].loyalty = identityArray[i].loyalty;
        //     match.playerArray[i].identity = identityArray[i].identity;
        // }
        return identityArray;
    }

}