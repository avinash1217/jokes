export default (state = {randomJoke: null}, action) => {
    switch (action.type) {
        case "RANDOM_JOKE":
            return JSON.parse(JSON.stringify({randomJoke: action.payload}))
        default:
            return state
    }
}