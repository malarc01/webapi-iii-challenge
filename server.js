const express = require('express') //importing a CommonJS module
const helmet = require('helmet'); //importing a CommonJS module
const morgan = require('morgan'); //importing a CommonJS module


const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

function greeter(teamName){
  return function (req, res, next){
    req.team = teamName;
    next();
  }
  
}

function moodyGateKeeper (req,res,next){
  const seconds = new Date().getSeconds();

  if (seconds %3===0){
    res.status(400).send("U Shall Not Pass");
  } else {
  next();
}
}



//configure global middleware
server.use(express.json()); //built in
server.use(helmet());
server.use(morgan('dev'));
server.use(greeter("TEAM AQUA"))
server.use(errorThree());
server.use(moodyGateKeeper);


//configure route handlers/endpoints/request handlers
server.use('/api/hubs', restricted, only("gimili"), hubsRouter);

server.get('/', (req, res)=>{
  res.send(
    `<h2> Application P I </h2>
    <p>Welcome ${req.team}</p>`);
});

function restricted(req,res,next){
  const password = req.headers.password;
  if (password ="joyride" )
  { next() }
  else { res.status(401).send('u shall not pass')}
}

server.use(errorHandler);

function errorHandler(error, req, res,next){
  res.status(400).send("Bad Panda!");
}

function only(name){
  return function (req,res,next){
    if(name===req.headers.name){
      next();
    } else{
      res.status(403).send('U SHALL NOT PASS!');
    }
  };
}
module.exports = server;

// we can read data from the body, url parameters , query string , headers


// 3 types of middleware => built in, third party , custom.
// we can use MW locally or globally 


//go to npmjs.com, find the morgan module & use it as global middleware
