const express = require('express');
const mongoose = require('mongoose');


const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost:27017/prf', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB successfully!');
});

app.use(cors());
app.use(cors({
  origin: 'http://localhost:4200'
}));

const User = require('./database/userSchema');

require('./database/productSchema');

require('./database/bootstrapper')();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

passport.use('local', new localStrategy(function (username, password, done) {
  User.findOne({ username: username }, function (err, user) {
      if (err) return done('Hiba lekeres soran', null);
      if (!user) return done('Nincs ilyen felhasználónév', null);
      user.comparePasswords(password, function (error, isMatch) {
          if (error) return done(error, false);
          if (!isMatch) return done('Hibas jelszo', false);
          return done(null, user);
      })
  })
}));


passport.serializeUser(function (user, done) {
  if (!user) return done('nincs megadva beléptethető felhasználó', null);
  return done(null, user);
});

passport.deserializeUser(function (user, done) {
  if (!user) return done("nincs user akit kiléptethetnénk", null);
  return done(null, user);
});

app.use(expressSession({ secret: 'prf2021lassananodejsvegereerunk', resave: true }));
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
   console.log('A middleware futott!');
   next();
});

app.use('/api/users', require('./routers/usersRouter'));

app.use('/api/product', require('./routers/productRouter'));

app.use('', express.static('frontend2/dist/frontend2'));

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/frontend2/dist/frontend2/index.html');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});