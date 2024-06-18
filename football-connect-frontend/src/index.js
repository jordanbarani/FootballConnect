// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminProfile from './components/AdminProfile';
import LiveScores from './components/LiveScores';
import LandingPage from './components/LandingPage';
import TeamsList from './components/TeamsList';
import MatchDetails from './components/MatchDetails';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/admin" element={<AdminProfile />} />
                <Route path="/live-scores" element={<LiveScores />} />
                <Route path="/teams" element={<TeamsList />} />
                <Route path="/match/:id" element={<MatchDetails />} />
            </Routes>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
