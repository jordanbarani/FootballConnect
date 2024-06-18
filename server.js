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

// Team Schema and Model
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  city: { type: String, required: true }
});

const Team = mongoose.model('Team', teamSchema);

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
