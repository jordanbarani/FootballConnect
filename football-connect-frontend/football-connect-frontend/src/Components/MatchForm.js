import React, { useState } from 'react';
import axios from 'axios';

const MatchForm = () => {
    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/matches/', { team1, team2, date })
            .then(response => {
                console.log('Match added:', response.data);
            })
            .catch(error => {
                console.error('There was an error adding the match!', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Team 1</label>
                <input type="text" value={team1} onChange={(e) => setTeam1(e.target.value)} />
            </div>
            <div>
                <label>Team 2</label>
                <input type="text" value={team2} onChange={(e) => setTeam2(e.target.value)} />
            </div>
            <div>
                <label>Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <button type="submit">Add Match</button>
        </form>
    );
};

export default MatchForm;
