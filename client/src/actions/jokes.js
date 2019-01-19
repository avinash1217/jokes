import jokesClient from '../api/jokes'
const api = new jokesClient()

export const getRandomJoke = () => dispatch => {
    api.getRandomJoke().then(joke => {
        dispatch({
            type: 'RANDOM_JOKE',
            payload: joke
        })
    })
    .catch(err => console.log("Could not get random joke!"))
}
