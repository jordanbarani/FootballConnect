import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MatchList = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/matches/')
            .then(response => {
                setMatches(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the matches!', error);
            });
    }, []);

    return (
        <div>
            <h2>Match List</h2>
            <ul>
                {matches.map(match => (
                    <li key={match.id}>{match.team1} vs {match.team2} on {match.date}</li>
                ))}
            </ul>
        </div>
    );
};

export default MatchList;
