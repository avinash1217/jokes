const Koa = require('koa')
const config = require('config')
const { MongoClient } = require('mongodb')
const mongodbUri = config.get('mongodbUri')
const fs = require('fs')
const app = new Koa()
const port = config.get('port')
const Router = require('koa-router')

const router = new Router()

  // const jokes = fs.readFileSync('jokes.csv')

;(async () => {
  const dbClient = await MongoClient.connect(mongodbUri, { useNewUrlParser: true })
  const db = dbClient.db()

  router.get('/api/jokes', async (ctx) => {
    const jokes = await db.collection('jokes').find({}, { joke: 1 }).toArray()
    ctx.body = jokes
  })

  router.get('*', async (ctx) => {
    const jokes = await db.collection('jokes').find({}, { joke: 1 }).toArray()
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)]
    ctx.body = `Welcome to the jokes system. Find the jokes at /api/jokes. But here's a random one:\n\n${randomJoke.joke}`
  })

  app.use(router.routes())

  app.listen(port, () => {
    console.log(`Jokes app listening on port ${port}.`)
  })
})()
