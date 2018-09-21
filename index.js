const express = require('express');
const fs = require('fs');
const app = express();
const parse = require('csv-parse');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'jokes.csv',
    header: [
      {id: 'name', title: 'NAME'},
      {id: 'lang', title: 'LANGUAGE'}
    ]
});
let allJokes;

fs.readFile('jokes.csv', (err, data) => {
  parse(data, {}, (err, jokes) => {
    allJokes = {jokes: jokes};

    app.get('/', function (req, res) {
      let i = Math.floor((Math.random() * jokes.length));
      let response = {
        joke: jokes[i][0]
      }
      res.json(response);
    });

    app.get('/jokes', function (req, res) {
      let response = {
        jokes: allJokes
      };
      res.json(response);
    });

    app.post('/jokes/new', function (req, res) {
      const records = [
          {name: 'Bob',  lang: 'French, English'},
          {name: 'Mary', lang: 'English'}
        ];
      // allJokes.jokes.push(newJoke);
      // res.send(allJokes);
      // const writeJokes = [];
      // allJokes.jokes.forEach((joke) => writeJokes.push(joke[0]));
      // console.log(writeJokes);
      csvWriter.writeRecords(records)       // returns a promise
        .then(() => {
            console.log('...Done');
        });
    });
  });
});






app.listen(3050, function () {
  console.log('Example app listening on port 3050.');
});
