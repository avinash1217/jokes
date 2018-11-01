// import the original jokes into our mongoDB database

const config = require('config')
const { MongoClient } = require('mongodb')
const mongodbUri = config.get('mongodbUri')
const fs = require('fs')

const jokes = fs.readFileSync('jokes.csv', 'utf8').split(/\r?\n/).map(v => { return { joke: v } })

;(async () => {
  const dbClient = await MongoClient.connect(mongodbUri, { useNewUrlParser: true })
  const db = dbClient.db()
  await db.collection('jokes').insertMany(jokes)
  await dbClient.close()
})()
