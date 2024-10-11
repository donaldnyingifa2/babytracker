import React, { useState } from 'react';

const FeedingTracker = () => {
  const [feedings, setFeedings] = useState([]);
  const [newFeeding, setNewFeeding] = useState({ type: 'breast milk', amount: '', time: '' });

  const handleInputChange = (e) => {
    setNewFeeding({ ...newFeeding, [e.target.name]: e.target.value });
  };

  const addFeeding = () => {
    setFeedings([...feedings, newFeeding]);
    setNewFeeding({ type: 'breast milk', amount: '', time: '' });
  };

  return (
    <div>
      <h2>Feeding Tracker</h2>
      <div>
        <select name="type" value={newFeeding.type} onChange={handleInputChange}>
          <option value="breast milk">Breast Milk</option>
          <option value="formula">Formula</option>
        </select>
        <input type="text" name="amount" placeholder="Amount (oz)" value={newFeeding.amount} onChange={handleInputChange} />
        <input type="time" name="time" value={newFeeding.time} onChange={handleInputChange} />
        <button onClick={addFeeding}>Add Feeding</button>
      </div>
      <ul>
        {feedings.map((feeding, index) => (
          <li key={index}>
            {feeding.time} - {feeding.type}: {feeding.amount} oz
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedingTracker;