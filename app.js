const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const cors = require('cors')
const { authenticationMiddleware } = require("./middleware/Auth")
const { User } = require('./models');
const { ProductController } = require('./Controllers/ProductController')
const { UserController } = require('./Controllers/UserController')

const bcrypt = require('bcrypt')
const app = express()
const server = require('http').createServer(app)

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
)

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/Static"))
app.use(passport.initialize());
app.use(passport.session())

passport.use(new LocalStrategy(
  async function (username, password, done) {
    let user = await User.findOne({ where: { email: username } });
    if (!user) { return done(null, false); }
    bcrypt.compare(password, user.password).then(function (result) {
      console.log(result);
      if (!result) { return done(null, false); }
      return done(null, user);
    });
  }
))

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  let user = await User.findByPk(id)
  done(null, user);
})

app.post('/spa', ProductController.spa)
app.post('/procedure', ProductController.spaMore)
app.post('/registration', UserController.add)

app.post('/signin', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (user) {
      req.logIn(user, (err) => {
        if (err) {
          res.send({ error: 'Somthing wrong' })
        }
        console.log(req.user);
        res.send({ status: 'ok' })
      })
    }
    else {
      res.send({ error: 'User not found' })
    }
  })(req, res, next)
})

app.post('/profile', UserController.profile)
// app.post('/logouT' , UserController.logOut)
app.post('/userCheck', async function (req, res) {
  if (req.user) {
    res.send('true')
  }
  else {
    res.send('false')
  }
})

server.listen(4000)