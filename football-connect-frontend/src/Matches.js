// src/Matches.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetchMatches();
    fetchTeams();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await axios.get('/api/matches');
      setMatches(response.data);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await axios.get('/api/teams');
      setTeams(response.data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const handleScheduleMatch = async (e) => {
    e.preventDefault();
    try {
      const newMatch = { homeTeam, awayTeam, date, location };
      await axios.post('/api/matches', newMatch);
      fetchMatches(); // Refresh the list of matches
      setHomeTeam('');
      setAwayTeam('');
      setDate('');
      setLocation('');
    } catch (error) {
      console.error('Error scheduling match:', error);
    }
  };

  return (
    <div>
      <h2>Matches</h2>
      <form onSubmit={handleScheduleMatch}>
        <select
          value={homeTeam}
          onChange={(e) => setHomeTeam(e.target.value)}
          required
        >
          <option value="">Select Home Team</option>
          {teams.map((team) => (
            <option key={team._id} value={team._id}>{team.name}</option>
          ))}
        </select>
        <select
          value={awayTeam}
          onChange={(e) => setAwayTeam(e.target.value)}
          required
        >
          <option value="">Select Away Team</option>
          {teams.map((team) => (
            <option key={team._id} value={team._id}>{team.name}</option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <button type="submit">Schedule Match</button>
      </form>
      <ul>
        {matches.map((match) => (
          <li key={match._id}>
            {match.homeTeam.name} vs {match.awayTeam.name} on {new Date(match.date).toLocaleDateString()} at {match.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Matches;
