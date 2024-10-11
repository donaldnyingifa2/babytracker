import React, { useState } from 'react';

const MilestoneTracker = () => {
  const [milestones, setMilestones] = useState([]);
  const [newMilestone, setNewMilestone] = useState({ area: 'social', description: '', date: '' });

  const milestoneAreas = ['social', 'communication', 'cognitive'];

  const handleInputChange = (e) => {
    setNewMilestone({ ...newMilestone, [e.target.name]: e.target.value });
  };

  const addMilestone = () => {
    setMilestones([...milestones, newMilestone]);
    setNewMilestone({ area: 'social', description: '', date: '' });
  };


  return (
    <div>
      <h2>Milestone Tracker</h2>
      <select name="area" value={newMilestone.area} onChange={handleInputChange}>
        {milestoneAreas.map((area) => (
          <option key={area} value={area}>
            {area.charAt(0).toUpperCase() + area.slice(1)}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="description"
        placeholder="Description (e.g., Smiled at grandma)"
        value={newMilestone.description}
        onChange={handleInputChange}
      />
      <input type="date" name="date" value={newMilestone.date} onChange={handleInputChange} />
      <button onClick={addMilestone}>Add Milestone</button>

      {milestoneAreas.map((area) => (
        <div key={area}>
          <h3>{area.charAt(0).toUpperCase() + area.slice(1)}</h3>
          <ul>
            {milestones
              .filter((milestone) => milestone.area === area)
              .map((milestone, index) => (
                <li key={index}>
                  {milestone.date} - {milestone.description}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};


export default MilestoneTracker;