const Twitter = require('twitter')
const router = require('express').Router()
const secrets = require('../../secrets')
const capitalCities = require('../../data/capitalCityInfo')
const cityInfo = ('../../data/cityInfo')


function countryIs(text) {
  for (let i = 0; i < capitalCities.length; i++) {
    if (text.indexOf(capitalCities[i].CountryName) !== -1) {
      return {
        name: capitalCities[i].CapitalName,
        long: capitalCities[i].CapitalLongitude,
        lat: capitalCities[i].CapitalLatitude
      }
    }
  }
}

function cityIs(text) {
  for (let i = 0; i < cityInfo.length; i++) {
    if (text.indexOf(cityInfo[i].name) !== -1) {
      return  {
        name: cityInfo[i].city,
        long: cityInfo[i].lng,
        lat: cityInfo[i].lat
      }
    }
  }
}

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const twitterIds = '972651, 428333, 14293310, 14293310, 5402612, 2890961, 759251, 19701628, 5392522, 776748128, 807095, 2467791, 16664681, 14085040, 7313362, 77280368, 20402945, 2836421, 39525027, 29372157'
//mashable, cnnbrk, time, breakingews, bbcbreaking, gizmodo cnn, bbc, npr, nytimesbreaking, nytimes, nytimesbreaking(??), wash post, latimes, miami herald, chicago tribune, al jazeer, cnbc, msnbc, pbsnewshour, nightlynews, 

const stream = client.stream('statuses/filter', { follow: twitterIds });

const io = io => {
  // stream.on('data', function (event) {

  //   const country = countryIs(event.text)
  //   const tweetText = event.text
  //   const location = cityIs(tweetText) || countryIs(tweetText)
  //   if (location) {
  //     console.log(tweetText)
  //     io.sockets.emit('new-tweet', { location, tweetText })
  //   }
  // });
  // stream.on('error', function (error) {
  //   console.log("error", error);
  // });

};


module.exports = { router, io }



