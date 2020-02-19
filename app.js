'use strict';

const express = require('express');
const morgan = require ('morgan');
const playData = require('./playstore');

const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res) =>{

  const {genres = '', sort} = req.query;

  const validGenre = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];

  if ('genre' in req.query && !validGenre.includes(genres)){
    return res.status(400).send('Genres must match with validGenres');
  }

  if (sort){
    if(!['Rating', 'App'].includes(sort)){
      return res.status(400).send('Sort must be one of Rating or App');
    }
  }

  let results = playData.filter(app => 
    app['Genres'].toLowerCase()
      .includes(genres.toLowerCase()));

  if(sort){
    results.sort((a, b) =>{
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  res.json(results);

});

module.exports = app;