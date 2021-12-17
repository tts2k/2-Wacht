import { INSERT_MOVIE, OPEN_LINK} from "./taskTypes";
const initialState = {
    watchListState: false,
    urlToOpen: ''
}

const refreshWatchList = (state) => {
    return {
        ...state,
        watchListState: !state.watchListState
    }
}
const openLink = (state, action) => {
    return {
        ...state,
        urlToOpen: action.payload
    }
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case INSERT_MOVIE:
            return refreshWatchList(state)
        case OPEN_LINK:
            return openLink(state, action);
        default:
            return state;
    }

}

export default taskReducer
