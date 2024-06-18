import React from 'react';
import AdminProfile from './components/AdminProfile';
import LiveScores from './components/LiveScores';
import LandingPage from './components/LandingPage';
import TeamsList from './components/TeamsList';
import MatchDetails from './components/MatchDetails';

const App = () => {
  return (
    <div className="App">
      <AdminProfile />    {/* Ensure AdminProfile component is rendered */}
      <LiveScores />      {/* Ensure LiveScores component is rendered */}
      <LandingPage />     {/* Ensure LandingPage component is rendered */}
      <TeamsList />       {/* Ensure TeamsList component is rendered */}
      <MatchDetails />    {/* Ensure MatchDetails component is rendered */}
    </div>
  );
};

export default App;
