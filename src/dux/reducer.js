let initialState = {
    match:{
        matchName:'',
        playerArray:[]
    }
}

const START_GAME = "START_GAME";

export default function reducer(state = initialState,action) {
    switch(action.type) {
        case START_GAME:
        // let newArr = [...state.characterList, action.payload]
        // return Object.assign({}, state, {characterList: newArr})
        break;
        default:
        return state;
    }
}

