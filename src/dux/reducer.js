let initialState = {
        room:'',
        playerArray:[],
        quest:0,
        attempt:0,
        resultsArray:[],
        proposedQuestsArray:[],
        teamLeader:0,
        phase:'not started'
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

const START_GAME = "START_GAME";

const SET_ROOM_CODE = "SET_ROOM_CODE";

const GET_ROOM = "GET_ROOM";

const SET_VALUES = "SET_VALUES";

export default function reducer(state = initialState,action) {
    switch(action.type) {
        case START_GAME:
        let newArr;
        switch(action.playerArray.length){
            case 5:
            newArr = shuffle([{loyalty:'good',identity:"Loyal Servant Of King Arthur"},{loyalty:'good',identity:"Merlin"},{loyalty:'evil',identity:"Assassin"},{loyalty:'good',identity:"Percival"},{loyalty:'evil',identity:"Morgana"}])
            return {
                room:action.room,
                playerArray:[{name:action.playerArray[0].name,identity:newArr[0].identity,loyalty:newArr[0].loyalty,image:action.playerArray[0].image},{name:action.playerArray[1].name,identity:newArr[1].identity,loyalty:newArr[1].loyalty,image:action.playerArray[1].image},{name:action.playerArray[2].name,identity:newArr[2].identity,loyalty:newArr[2].loyalty,image:action.playerArray[2].image},{name:action.playerArray[3].name,identity:newArr[3].identity,loyalty:newArr[3].loyalty,image:action.playerArray[3].image},{name:action.playerArray[4].name,identity:newArr[4].identity,loyalty:newArr[4].loyalty,image:action.playerArray[4].image}],
                quest:1,
                attempt:1,
                resultsArray:[],
                proposedQuestsArray:[],
                teamLeader:Math.floor(Math.random() * 5)+1,
                phase:'propose'
            }
            case 6:
            newArr = shuffle([{loyalty:'good',identity:"Loyal Servant Of King Arthur"},{loyalty:'good',identity:"Merlin"},{loyalty:'evil',identity:"Assassin"},{loyalty:'good',identity:"Percival"},{loyalty:'evil',identity:"Morgana"},{loyalty:'good',identity:"Loyal Servant Of King Arthur"}])
            return {
                room:action.room,
                playerArray:[{name:action.playerArray[0].name,identity:newArr[0].identity,loyalty:newArr[0].loyalty,image:action.playerArray[0].image},{name:action.playerArray[1].name,identity:newArr[1].identity,loyalty:newArr[1].loyalty,image:action.playerArray[1].image},{name:action.playerArray[2].name,identity:newArr[2].identity,loyalty:newArr[2].loyalty,image:action.playerArray[2].image},{name:action.playerArray[3].name,identity:newArr[3].identity,loyalty:newArr[3].loyalty,image:action.playerArray[3].image},{name:action.playerArray[4].name,identity:newArr[4].identity,loyalty:newArr[4].loyalty,image:action.playerArray[4].image},{name:action.playerArray[5].name,identity:newArr[5].identity,loyalty:newArr[5].loyalty,image:action.playerArray[5].image}],
                quest:1,
                attempt:1,
                resultsArray:[],
                proposedQuestsArray:[],
                teamLeader:Math.floor(Math.random() * 6)+1,
                phase:'propose'
            }
            case 7:
            newArr = shuffle([{loyalty:'good',identity:"Loyal Servant Of King Arthur"},{loyalty:'good',identity:"Merlin"},{loyalty:'evil',identity:"Assassin"},{loyalty:'good',identity:"Percival"},{loyalty:'evil',identity:"Morgana"},{loyalty:'good',identity:"Loyal Servant Of King Arthur"},{loyalty:'evil',identity:"Mordred"}])
            return {
                room:action.room,
                playerArray:[{name:action.playerArray[0].name,identity:newArr[0].identity,loyalty:newArr[0].loyalty,image:action.playerArray[0].image},{name:action.playerArray[1].name,identity:newArr[1].identity,loyalty:newArr[1].loyalty,image:action.playerArray[1].image},{name:action.playerArray[2].name,identity:newArr[2].identity,loyalty:newArr[2].loyalty,image:action.playerArray[2].image},{name:action.playerArray[3].name,identity:newArr[3].identity,loyalty:newArr[3].loyalty,image:action.playerArray[3].image},{name:action.playerArray[4].name,identity:newArr[4].identity,loyalty:newArr[4].loyalty,image:action.playerArray[4].image},{name:action.playerArray[5].name,identity:newArr[5].identity,loyalty:newArr[5].loyalty,image:action.playerArray[5].image},{name:action.playerArray[6].name,identity:newArr[6].identity,loyalty:newArr[6].loyalty,image:action.playerArray[6].image}],
                quest:1,
                attempt:1,
                resultsArray:[],
                proposedQuestsArray:[],
                teamLeader:Math.floor(Math.random() * 7)+1,
                phase:'propose'
            }
            case 8:
            newArr = shuffle([{loyalty:'good',identity:"Loyal Servant Of King Arthur"},{loyalty:'good',identity:"Merlin"},{loyalty:'evil',identity:"Assassin"},{loyalty:'good',identity:"Percival"},{loyalty:'evil',identity:"Morgana"},{loyalty:'good',identity:"Loyal Servant Of King Arthur"},{loyalty:'evil',identity:"Mordred"},{loyalty:'good',identity:"Loyal Servant Of King Arthur"}])
            return {
                room:action.room,
                playerArray:[{name:action.playerArray[0].name,identity:newArr[0].identity,loyalty:newArr[0].loyalty,image:action.playerArray[0].image},{name:action.playerArray[1].name,identity:newArr[1].identity,loyalty:newArr[1].loyalty,image:action.playerArray[1].image},{name:action.playerArray[2].name,identity:newArr[2].identity,loyalty:newArr[2].loyalty,image:action.playerArray[2].image},{name:action.playerArray[3].name,identity:newArr[3].identity,loyalty:newArr[3].loyalty,image:action.playerArray[3].image},{name:action.playerArray[4].name,identity:newArr[4].identity,loyalty:newArr[4].loyalty,image:action.playerArray[4].image},{name:action.playerArray[5].name,identity:newArr[5].identity,loyalty:newArr[5].loyalty,image:action.playerArray[5].image},{name:action.playerArray[6].name,identity:newArr[6].identity,loyalty:newArr[6].loyalty,image:action.playerArray[6].image},{name:action.playerArray[7].name,identity:newArr[7].identity,loyalty:newArr[7].loyalty,image:action.playerArray[7].image}],
                quest:1,
                attempt:1,
                resultsArray:[],
                proposedQuestsArray:[],
                teamLeader:Math.floor(Math.random() * 8)+1,
                phase:'propose'
            }
            case 9:
            newArr = shuffle([{loyalty:'good',identity:"Loyal Servant Of King Arthur"},{loyalty:'good',identity:"Merlin"},{loyalty:'evil',identity:"Assassin"},{loyalty:'good',identity:"Percival"},{loyalty:'evil',identity:"Morgana"},{loyalty:'good',identity:"Loyal Servant Of King Arthur"},{loyalty:'evil',identity:"Mordred"},{loyalty:'good',identity:"Loyal Servant Of King Arthur"},{loyalty:'good',identity:"Loyal Servant Of King Arthur"}])
            return {
                room:action.room,
                playerArray:[{name:action.playerArray[0].name,identity:newArr[0].identity,loyalty:newArr[0].loyalty,image:action.playerArray[0].image},{name:action.playerArray[1].name,identity:newArr[1].identity,loyalty:newArr[1].loyalty,image:action.playerArray[1].image},{name:action.playerArray[2].name,identity:newArr[2].identity,loyalty:newArr[2].loyalty,image:action.playerArray[2].image},{name:action.playerArray[3].name,identity:newArr[3].identity,loyalty:newArr[3].loyalty,image:action.playerArray[3].image},{name:action.playerArray[4].name,identity:newArr[4].identity,loyalty:newArr[4].loyalty,image:action.playerArray[4].image},{name:action.playerArray[5].name,identity:newArr[5].identity,loyalty:newArr[5].loyalty,image:action.playerArray[5].image},{name:action.playerArray[6].name,identity:newArr[6].identity,loyalty:newArr[6].loyalty,image:action.playerArray[6].image},{name:action.playerArray[7].name,identity:newArr[7].identity,loyalty:newArr[7].loyalty,image:action.playerArray[7].image},{name:action.playerArray[8].name,identity:newArr[8].identity,loyalty:newArr[8].loyalty,image:action.playerArray[8].image}],
                quest:1,
                attempt:1,
                resultsArray:[],
                proposedQuestsArray:[],
                teamLeader:Math.floor(Math.random() * 9)+1,
                phase:'propose'
            }
            case 10:
            newArr = shuffle([{loyalty:'good',identity:"Loyal Servant Of King Arthur"},{loyalty:'good',identity:"Merlin"},{loyalty:'evil',identity:"Assassin"},{loyalty:'good',identity:"Percival"},{loyalty:'evil',identity:"Morgana"},{loyalty:'good',identity:"Loyal Servant Of King Arthur"},{loyalty:'evil',identity:"Mordred"},{loyalty:'good',identity:"Loyal Servant Of King Arthur"},{loyalty:'good',identity:"Loyal Servant Of King Arthur"},{loyalty:'evil',identity:"Oberon"}])
            return {
                room:action.room,
                playerArray:[{name:action.playerArray[0].name,identity:newArr[0].identity,loyalty:newArr[0].loyalty,image:action.playerArray[0].image},{name:action.playerArray[1].name,identity:newArr[1].identity,loyalty:newArr[1].loyalty,image:action.playerArray[1].image},{name:action.playerArray[2].name,identity:newArr[2].identity,loyalty:newArr[2].loyalty,image:action.playerArray[2].image},{name:action.playerArray[3].name,identity:newArr[3].identity,loyalty:newArr[3].loyalty,image:action.playerArray[3].image},{name:action.playerArray[4].name,identity:newArr[4].identity,loyalty:newArr[4].loyalty,image:action.playerArray[4].image},{name:action.playerArray[5].name,identity:newArr[5].identity,loyalty:newArr[5].loyalty,image:action.playerArray[5].image},{name:action.playerArray[6].name,identity:newArr[6].identity,loyalty:newArr[6].loyalty,image:action.playerArray[6].image},{name:action.playerArray[7].name,identity:newArr[7].identity,loyalty:newArr[7].loyalty,image:action.playerArray[7].image},{name:action.playerArray[8].name,identity:newArr[8].identity,loyalty:newArr[8].loyalty,image:action.playerArray[8].image},{name:action.playerArray[9].name,identity:newArr[9].identity,loyalty:newArr[9].loyalty,image:action.playerArray[9].image}],
                quest:1,
                attempt:1,
                resultsArray:[],
                proposedQuestsArray:[],
                teamLeader:Math.floor(Math.random() * 10)+1,
                phase:'propose'
            }
            default:
            return state;
        }
        case SET_VALUES:
        return{
            room:action.room,
            playerArray:action.playerArray,
            quest:action.quest,
            attempt:action.attempt,
            resultsArray:action.resultsArray,
            proposedQuestsArray:action.proposedQuestsArray,
            teamLeader:action.teamLeader,
            phase:action.phase
        }
        case SET_ROOM_CODE:
        return {room: action.room}
        case GET_ROOM:
        return { room: state.room };
        default:
        return state;
    }
}

export function setRoomCode(room){
    return {room, type:SET_ROOM_CODE}
}

export function getRoomCode(){
return {type: GET_ROOM}
}

export function startGame(room,playerArray){
    return {room,playerArray,type:START_GAME}
}

export function setValues(room,playerArray,quest,attempt,resultsArray,proposedQuestsArray,teamLeader,phase){
    return {room,playerArray,quest,attempt,resultsArray,proposedQuestsArray,teamLeader,phase,type:SET_VALUES}
}
