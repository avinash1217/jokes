const express = require("express")
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.js")[env];
const models = require("../db/models");
const router = express.Router();
const logger = require("../services/logger");
const request = require("request-promise");
const Either = require("../lib/Either.js");
const R = require("ramda");
const async = require("asyncawait/async");
const await = require("asyncawait/await");
const helper = require("../utils/helper");
const uuid = require("uuid");
// const NPCI = require("../services/npci.js");
// const redis = require("../services/redis");
const Account = models.Account;
const Joke = models.Joke;
const JokeCategory = models.JokeCategory;
const constants = require("../utils/constants");
// const npciData = require("../npci/requestJson");
// const npciResponseData = require("../npci/responseJson");
// const npciMapper = require("../npci/mapper.js");
const xmlParser = require("xml2json");
const removeSpecialCharRegex = /[^a-zA-Z0-9 ]/g;
// const txnHelper = require("../utils/txnHelper");
// const rateLimiter = require("../services/rateLimiter");
const sequelize = models.sequelize;

router.get("/", (req, res) => {
  filterJokes(req.state)
    .bichain(postTxn, postTxn)
    .fold(l => l, r => r)
    .subscribe(val => {
      return res.status(200).send(val);
    }, err => {
      helper.log500Error(err, req);
      return res.status(500).send({ error: true, message: "Internal Server Error" });
    })
});

router.get("/categories", (req, res)=>{
getJokeCategories(req.state).liftOE()
  .bichain(postTxn, postTxn)
  .fold(l => l, r => r)
  .subscribe(val => {
    return res.status(200).send(val);
  }, err => {
    helper.log500Error(err, req);
    return res.status(500).send({ error: true, message: "Internal Server Error" });
  })
});

router.post("/create", (req, res) => {
  createJoke(req.state)
    .bichain(postTxn, postTxn)
    .fold(l => l, r => r)
    .subscribe(val => {
      return res.status(200).send(val);
    }, err => {
      helper.log500Error(err, req);
      return res.status(500).send({ error: true, message: "Internal Server Error" });
    })
});

router.post("/update", (req, res) => {
    updateJoke(req.state).liftOE()
    .bichain(postTxn, postTxn)
    .fold(l => l, r => r)
    .subscribe(val => {
      return res.status(200).send(val);
    }, err => {
      helper.log500Error(err, req);
      return res.status(500).send({ error: true, message: "Internal Server Error" });
    })
});

router.post("/delete", (req, res) => {
  deleteJoke(req.state)
    .chain(deleteJokeSuccessful)
    .bichain(postTxn, postTxn)
    .fold(l => l, r => r)
    .subscribe(val => {
      return res.status(200).send(val);
    }, err => {
      helper.log500Error(err, req);
      return res.status(500).send({ error: true, message: "Internal Server Error" });
    })
});

const filterJokes = state => {
  if (state.reqQuery && state.reqQuery.category) {
    return getJokesByCategory(state);
  }else {
    return getAllJokes(state);
  }
}

const getJokesByCategory = helper.genericModelOutput("jokes", {
    error: true,
    message: "Error fetching jokes",
    userMessage: "Error fetching jokes"
  },
  state => helper.findAll("Joke",{jokesCategory : state.reqQuery.category}).liftOE()
);

const getAllJokes = helper.genericModelOutput("jokes", {
    error: true,
    message: "Error fetching jokes",
    userMessage: "Error fetching jokes"
  },
  state => helper.findAll("Joke",{}).liftOE()
);

const getJokeCategories = async(state => {
let jokeCategories = [];
result = await( models.sequelize.query(`SELECT DISTINCT "category" FROM "JokesCategories";`));
if(result && result[0].length>0){
  for(var i = 0; i< result[0].length; i++){
    jokeCategories.push(result[0][i]["category"]);
    }
  }
  state = R.merge(state, {categories : jokeCategories});
  return state;
});

const createJoke = state => {
  return createPayload(state)
    .chain(createDbRecord)
    .bichain(state=>{
      delete state.error;
      delete state.errorCode;
      delete state.userMessage;
      delete state.message;
      return Either.Right(state).liftOE()}, state => {return Either.Right(state).liftOE() })
}

const createPayload = (state) => {
  let payload = {};
  if(state.reqBody.joke != null && R.is(Object, state.reqBody.joke)){
    payload = createJokePayload(state);
  }
  state.payload = payload;
  return Either.Right(state).liftOE();
};

const createJokePayload = (state) => {
  let createPayload = {};
  createPayload.description = state.reqBody.joke.description;
  createPayload.jokesCategory = state.reqBody.joke.jokesCategory;
  return createPayload;
};

const createDbRecord = helper.genericModelOutput("joke",constants.JP3,
  state => helper.createRecord("Joke", state.payload)
);

const updateOneJoke = (joke) => {
  return helper.updateRecordP("Joke", getNewJokeKeys(joke), {
    description: joke.oldDescription
  });
};

const getNewJokeKeys = joke => {
  let keys = {};
  if(R.has("description")(joke)){
    keys.description = joke.description,
    keys.jokesCategory = joke.category
  }
  return keys;
}

const updateJoke = async(state => {
  if(state.reqBody.joke != null && R.is(Object, state.reqBody.joke)){
    let updatedJoke = await( updateOneJoke(state.reqBody.joke) );
      if(!updatedJoke) {
        state.joke = R.merge(state.reqBody, {error: true});
      } else {
        state.joke = updatedJoke;
      }
    }
  return state;
});

const deleteJoke = helper.genericModelOutput("joke", {
    error: true,
    message: "Error deleting joke",
    userMessage: "Error deleting joke"
  },
  state => helper.deleteRecord("Joke", {
    where: {
      description : state.reqBody.joke.description
    }
  })
);

const deleteJokeSuccessful = (state) => {
  if (state.joke ) {
    delete state.joke;
    return Either.Right(R.merge(state, {status: "SUCCESS"})).liftOE();
  }
  delete state.joke;
  return Either.Left(R.merge(state, { error: true, message: "Error Deleting joke" })).liftOE();
}

const postTxn = (state, flag) => {
  return logTxnInfo(state, flag)
    .bimap(state => helper.getWhitelistedOp(state, {
      whiteList: [ "jokes", "joke", "categories"],
      blackList: [],
      default: constants.BLACKLISTALL
    }), state => helper.getWhitelistedOp(state, {
      whiteList: ["jokes", "joke", "categories"],
      blackList: [],
      default: constants.BLACKLISTALL
    }))
};

const logTxnInfo = (state, flag) => {
  try {
      logger.info(state.sessionId, state.requestId, state);
  } catch (e) {
    console.log("Error while logging ", state, e);
  }
  return flag ? Either.Right(state).liftOE() : Either.Left(state).liftOE();
};

module.exports = router;
