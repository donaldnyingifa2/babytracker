import React from "react";
import FeedingTracker from "./FeedingTracker";
import MilestoneTracker from "./MilestoneTracker";

const App = () => {
  return (
    <div className='app-container'>
      <h1>Baby Tracker</h1>
      <FeedingTracker />
      <MilestoneTracker />
    </div>
  );
};

export default App;
