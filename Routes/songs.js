const express = require('express');
const Song = require('../models/Song');
const Listen = require('../models/Listen');
const router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.session.userId) return next();
  res.redirect('/login');
}

router.get('/', isAuthenticated, async (req, res) => {
  const songs = await Song.find();
  const listens = await Listen.find({ userId: req.session.userId });

  const listenMap = {};
  listens.forEach(listen => {
    listenMap[listen.songId.toString()] = listen.playCount;
  });

  res.render('songList', { songs, listenMap });
});


router.post('/listen/:id', isAuthenticated, async (req, res) => {
  const userId = req.session.userId;
  const songId = req.params.id;

  let listen = await Listen.findOne({ userId, songId });

  if (!listen) {
    listen = new Listen({ userId, songId, playCount: 1 });
  } else {
    listen.playCount += 1;
  }

  await listen.save();

  if (listen.playCount === 5) {
    const otherSongs = await Song.find({ _id: { $ne: songId } });

    if (otherSongs.length > 0) {
      const random = otherSongs[Math.floor(Math.random() * otherSongs.length)];
      return res.json({
        message: 'You’ve unlocked a recommendation!',
        recommended: random
      });
    }
  }

  res.json({ message: 'Play count updated' });
});


router.delete('/listen/:id', isAuthenticated, async (req, res) => {
  const { userId } = req.session;
  const { id: songId } = req.params;

  const listen = await Listen.findOne({ userId, songId });

  if (listen) {
    listen.playCount -= 1;
    if (listen.playCount <= 0) {
      await listen.deleteOne(); 
    } else {
      await listen.save(); 
    }
    return res.json({ message: 'Play count decreased' });
  }

  res.json({ message: 'No listen record found' });
});


router.get('/search', isAuthenticated, async (req, res) => {
  const q = req.query.q || '';
  const regex = new RegExp(q, 'i');
  const songs = await Song.find({
    $or: [ { title: regex }, { artist: regex } ]
  });
  res.render('songList', { songs, listenMap: {} });
});

router.post('/add', isAuthenticated, async (req, res) => {
  const { title, artist, genre } = req.body;
  if (!title || !artist || !genre) {
    return res.status(400).send('All fields required');
  }

  await Song.create({
    title,
    artist,
    genre,
    recommended: []
  });

  res.redirect('/songs');
});

router.post('/delete/:id', isAuthenticated, async (req, res) => {
  const songId = req.params.id;

  await Song.findByIdAndDelete(songId);
  await Listen.deleteMany({ songId });

  res.redirect('/songs');
});



module.exports = router;
