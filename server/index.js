const express = require("express");
const fs = require("fs");
const debug = require("debug")("jokes:index.js");
const mongoose = require("mongoose");
const MongoMemoryDb = require("mongodb-memory-server").MongoMemoryServer;
const cors = require("cors");

const app = express();
app.use(cors());

const parse = require("csv-parse");

const mongoServer = new MongoMemoryDb();

let jokeSet;
let JokeModel;

fs.readFile("jokes.csv", (err, data) => {
  parse(data, {}, (error, jokes) => {
    jokeSet = jokes;
    return jokes;
  });
});

async function mongoHandler() {
  const mongoUrl = await mongoServer.getConnectionString();
  const mongooseOpts = {
    autoReconnect: true,
    reconnectTries: 5,
    reconnectInterval: 1000
  };

  await mongoose.connect(mongoUrl, mongooseOpts);

  mongoose.connection.on("error", e => {
    debug(e);
    mongoose.connect(mongoUrl, mongooseOpts);
  });

  mongoose.connection.once("open", () => {
    debug(`MongoDB successfully connected to ${mongoUrl}`);
  });

  const jokeSchema = new mongoose.Schema({
    joke: String
  });

  JokeModel = mongoose.model("Jokes", jokeSchema);

  jokeSet.forEach(async function(item) {
    debug(`Saving joke to MongoDB: ${item}`);
    const joke = new JokeModel({ joke: item });
    joke.save(function(err) {
      if (err) {
        debug(err);
      }
    });
  });
}

app.get("/jokes/alljokes", function(req, res) {
  JokeModel.find(function(err, jokes) {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(jokes);
    return jokes;
  });
});

app.get("/jokes", function(req, res) {
  JokeModel.find({ joke: req.query.joke }, function(err, joke) {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(joke);
  });
});

app.post("/jokes", function(req, res) {
  try {
    const newJoke = new JokeModel({ joke: req.query.joke });
    newJoke.save();
    res.status(200).send(newJoke);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch("/jokes", function(req, res) {
  JokeModel.findById(req.query.id, function(err, joke) {
    if (err) {
      res.status(500).send(err);
    }
    debug(req.query);
    joke.joke = req.query.newJoke; // eslint-disable-line
    joke.save(function(error, updatedJoke) {
      if (error) {
        res.status(500).send(error);
      }
      res.status(200).send(updatedJoke);
    });
  });
});

app.delete("/jokes", function(req, res) {
  JokeModel.findById(req.query.id, function(err, joke) {
    if (err) {
      res.status(500).send(err);
    }
    debug(req.query);
    joke.delete();
    res.status(200).send(joke);
  });
});

app.listen(3050, function() {
  debug("Starting application.");
  mongoHandler();
});
