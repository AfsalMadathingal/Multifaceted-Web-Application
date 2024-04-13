const express= require('express');
const app= express();
const quotesApi= require('../../public/json/quotesApi.json');



app.get('/random-movie-quote', (req, res) => {
   
    const randomIndex = Math.floor(Math.random() * quotesApi.length);
    const randomQuote = quotesApi[randomIndex];
    console.log(randomQuote);
    res.status(200).json(randomQuote);
  });


app.get('/ping', (req, res) => {

    res.status(200).json(true)
    
})

module.exports = app
