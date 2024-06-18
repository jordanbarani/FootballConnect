// src/components/MatchList.js

import React, { useState, useEffect } from 'react';

const MatchList = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('http://localhost:3002/matches');
        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div>
      <h2>Matches</h2>
      <ul>
        {matches.map((match) => (
          <li key={match._id}>
            {match.homeTeam.name} vs {match.awayTeam.name} - {match.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchList;
