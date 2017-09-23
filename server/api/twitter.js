const Twitter = require('twitter')
const router = require('express').Router()
const secrets = require('../../secrets')
const countries = require('../../data/listOfCountries')


function countryIs(text) {
  for (let i = 0; i < countries.length; i++) {
    if (text.indexOf(countries[i])!==-1) {
      return countries[i]
    }
  }
}

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const twitterIds = '972651, 428333, 14293310, 14293310, 5402612, 2890961'
//mashable, cnnbrk, time, breakingews, bbcbreaking, gizmodo

const stream = client.stream('statuses/filter', { follow: twitterIds });

const io = io => {

  stream.on('data', function (event) {
    if (event.place || event.location || event.geo || countryIs(event.text)) {
      console.log(event.place || event.location || event.geo || countryIs(event.text), event.text)
      io.sockets.emit('new-tweet', event.place || event.location || event.geo || countryIs(event.text))
    }
  });

  stream.on('error', function (error) {
    console.log("error", error);
  });

};


module.exports = { router, io }



