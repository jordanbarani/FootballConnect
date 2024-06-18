// src/components/MatchForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MatchForm = () => {
    const [teams, setTeams] = useState([]);
    const [homeTeam, setHomeTeam] = useState('');
    const [awayTeam, setAwayTeam] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newMatch = { homeTeam, awayTeam, date, location };
            await axios.post('/api/matches', newMatch);
            setHomeTeam('');
            setAwayTeam('');
            setDate('');
            setLocation('');
        } catch (error) {
            console.error('Error scheduling match:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={homeTeam} onChange={(e) => setHomeTeam(e.target.value)} required>
                <option value="">Select Home Team</option>
                {teams.map((team) => (
                    <option key={team._id} value={team._id}>{team.name}</option>
                ))}
            </select>
            <select value={awayTeam} onChange={(e) => setAwayTeam(e.target.value)} required>
                <option value="">Select Away Team</option>
                {teams.map((team) => (
                    <option key={team._id} value={team._id}>{team.name}</option>
                ))}
            </select>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            <button type="submit">Schedule Match</button>
        </form>
    );
};

export default MatchForm;
