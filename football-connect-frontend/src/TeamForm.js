// src/components/TeamForm.js

import React, { useState } from 'react';

const TeamForm = ({ onTeamAdded }) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTeam = { name, city };

    try {
      const response = await fetch('http://localhost:3002/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTeam)
      });

      if (response.ok) {
        const addedTeam = await response.json();
        onTeamAdded(addedTeam);
        setName('');
        setCity('');
      } else {
        console.error('Failed to add team');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Team Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Add Team</button>
    </form>
  );
};

export default TeamForm;
