// src/Teams.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [stadium, setStadium] = useState('');

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get('/api/teams');
      setTeams(response.data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const handleAddTeam = async (e) => {
    e.preventDefault();
    try {
      const newTeam = { name, city, stadium };
      await axios.post('/api/teams', newTeam);
      fetchTeams(); // Refresh the list of teams
      setName('');
      setCity('');
      setStadium('');
    } catch (error) {
      console.error('Error adding team:', error);
    }
  };

  return (
    <div>
      <h2>Teams</h2>
      <form onSubmit={handleAddTeam}>
        <input
          type="text"
          placeholder="Team Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Stadium"
          value={stadium}
          onChange={(e) => setStadium(e.target.value)}
          required
        />
        <button type="submit">Add Team</button>
      </form>
      <ul>
        {teams.map((team) => (
          <li key={team._id}>{team.name} - {team.city} - {team.stadium}</li>
        ))}
      </ul>
    </div>
  );
};

export default Teams;
