import { INSERT_MOVIE } from "./taskTypes";
const initialState = {
    watchListState: false 
}

const refreshWatchList = (state) => {
    return {
        ...state,
        watchListState: !state.watchListState
    }
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case INSERT_MOVIE:
            return refreshWatchList(state)
        default:
            return state;
    }
}

export default taskReducer
