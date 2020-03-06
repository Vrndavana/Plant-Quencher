import React, { useState, useEffect } from "react";
import axios from "axios";

function Plant({ plant, index, deletePlant }) {
  return (
    <div className="plant">
      {plant.text}
      <div className="plantButtons">
        <button className="delbtn" onClick={() => deletePlant(index)}>Delete</button>
      </div>
    </div>
  );
}
function PlantForm({ addPlant }) {
  const [value, setValue] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addPlant(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add Plant..."
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}
function CreatePlant() {
  const [plants, setPlants] = useState([
    {
      text: "Succulent",
    },
    {
      text: "Pink Jasmine",
    },
    {
      text: "Draco",
    }
  ]);
  const addPlant = text => {
    const newPlants = [...plants, { text }];
    setPlants(newPlants);
  };
  const deletePlant = index => {
    const newPlants = [...plants];
    newPlants.splice(index, 1);
    setPlants(newPlants);
  };
  useEffect(() => {
    axios
    .get("https://wmpbackend.herokuapp.com/api/plants")
    .then (response => {
        console.log(response);
    });
}, []);

  return (
    <div className="createPlant">
      <div className="plantList">
      <h2>My Plants</h2>
        {plants.map((plant, index) => (
          <Plant
            key={index}
            index={index}
            plant={plant}
            deletePlant={deletePlant}
          />
        ))}
        <PlantForm addPlant={addPlant} />
        <h2>Types of Plants</h2>
        <h3>Roses</h3>
        <h3>Sunflowers</h3>
        <h3>Tulips</h3>
      </div>
    </div>
  );
}
export default CreatePlant;