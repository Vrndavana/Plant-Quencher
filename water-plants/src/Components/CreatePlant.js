import React, { useState } from "react";
function Plant({ plant, index, editPlant, deletePlant }) {
  return (
    <div className="plant">
      {plant.text}
      <div className="plantButtons">
        <button className="editbtn" onClick={() => editPlant(index)}>Edit</button>
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
  const editPlant = text => {
      const newPlants = [...plants, {text}];
      setPlants(newPlants)
  }
  const deletePlant = index => {
    const newPlants = [...plants];
    newPlants.splice(index, 1);
    setPlants(newPlants);
  };
  return (
    <div className="createPlant">
      <div className="plantList">
      <h2>My Plants</h2>
        {plants.map((plant, index) => (
          <Plant
            key={index}
            index={index}
            plant={plant}
            editPlant={editPlant}
            deletePlant={deletePlant}
          />
        ))}
        <PlantForm addPlant={addPlant} />
      </div>
    </div>
  );
}
export default CreatePlant;