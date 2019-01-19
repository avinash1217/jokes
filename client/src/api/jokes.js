import config from '../config'
class jokesClient {
    constructor() {
        this.endpoint = `${config.server}/api/jokes`
    }

    getParams(params) {
        let query = ""
        for (let param in params) {
            query += `${param}=${params[param]}&`
        }

        return query = query.slice(0, -1)
    }

    getRandomJoke () {
        let url = `${this.endpoint}/random`

        return fetch(url)
        .then(res => res.json())
    }
}

export default jokesClient