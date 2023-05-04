const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('user');

const passport = require('passport');

router.route('/login').post((req, res, next) => {
  if (req.body.username, req.body.password) {
    passport.authenticate('local', function (error, user) {
      if (error) return res.status(500).json({ success: false });
      req.login(user, function (error) {
        if (error) return res.status(500).json({ success: false });
        return res.status(200).json({ success: true });
      })
    })(req, res);
  } else {
    return res.status(400).json({ success: false });
  }
});

router.route('/logout').post((req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if(err) {
        console.log('Hiba a kijelentkezés során');
        return res.status(500).json({ success: false });
      }
      return res.status(200).json({ success: true });
    });
  } else {
    return res.status(403).json({ success: false });
  }
});

router.route('/status').get((req, res, next) => {
    return res.status(200).send(req.isAuthenticated());
});

async function getUser(req, res, next) {
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'A felhasználó nem található' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.user = user;
  next();
};

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

router.post('/', async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  try {
    await user.save();
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

router.patch('/:id', getUser, async (req, res) => {
  if (req.body.username != null) {
    res.user.username = req.body.username;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.accessLevel != null) {
    res.user.accessLevel = req.body.accessLevel;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'A felhasználó sikeresen törölve!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router