import React, { useState } from "react";
import { frontend_assets } from '../assets/frontend_assets/assets'

const actors = [
  { id: 1, name: "Actor 1", imgSrc: frontend_assets.register_logo_img },
  { id: 2, name: "Actor 2", imgSrc: "actor2.jpg" },
  { id: 3, name: "Actor 3", imgSrc: "actor3.jpg" },
  { id: 4, name: "Actor 4", imgSrc: "actor4.jpg" },
];

const NewSelect = () => {
  const [selectedActors, setSelectedActors] = useState([]);

  const handleChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedActors(selectedOptions);
  };

  return (
    <div className="select-container">
      <label htmlFor="actor-select">Select Actors</label>
      <select
        id="actor-select"
        multiple
        onChange={handleChange}
        value={selectedActors}
      >
        {actors.map((actor) => (
          <option key={actor.id} value={actor.name}>
            <img src={actor.imgSrc} alt={actor.name} className="actor-image" />
            {actor.name}
          </option>
        ))}
      </select>
      <div className="selected-actors">
        <h4>Selected Actors:</h4>
        <ul>
          {selectedActors.map((actorName) => (
            <li key={actorName}>{actorName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewSelect;
