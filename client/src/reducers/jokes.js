const initialState = {
    randomJoke: null,
    jokesView: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "RANDOM_JOKE":
            return { ...state, randomJoke: action.payload }
        case "JOKES":
            return { ...state, jokesView: action.payload }
        default:
            return state
    }
}