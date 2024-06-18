// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3002;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const dbURI = 'mongodb://localhost:27017/football-connect';
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error: ', err));

// User Schema and Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

const User = mongoose.model('User', userSchema);

// Team Schema and Model
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  city: { type: String, required: true }
});

const Team = mongoose.model('Team', teamSchema);

// Match Schema and Model
const matchSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  homeTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  awayTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  score: { home: Number, away: Number }
});

const Match = mongoose.model('Match', matchSchema);

// Routes for Teams
app.post('/teams', async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).send(team);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/teams', async (req, res) => {
  try {
    const teams = await Team.find();
    res.send(teams);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Routes for Matches
app.post('/matches', async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.status(201).send(match);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/matches', async (req, res) => {
  try {
    const matches = await Match.find().populate('homeTeam awayTeam');
    res.send(matches);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
