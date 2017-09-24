const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();

// general purpose middleware
app.use(require('./middleware/logging'));
app.use(require('./middleware/body-parsing'));
app.use(express.static(path.join(__dirname, '../public')));


// serve api routes
app.use('/api', require('./api')); // matches all requests to /api

// error handling
app.use(require('./middleware/error'));

// serve index.html for all non-api routes
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// process.env.PORT for deploying to Heroku or 3000 for local
const port = process.env.PORT || 3000; 

const server = app.listen(port, function(){
  console.log('Your server, listeining on port', port)
})
const io = require('socket.io')(server);
require('./api/twitter').io(io);

