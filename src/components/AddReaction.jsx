import React, { useState } from "react";
const AddReaction = ({ onReactionAdded }) => {
  const [reactionData, setReactionData] = useState({
    name: "",
    description: "",
    font_awesome_icon: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReactionData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Enviando nueva reacción:', reactionData);
    onReactionAdded(reactionData);
    setReactionData({
      name: "",
      description: "",
      font_awesome_icon: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={reactionData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={reactionData.description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="font_awesome_icon"
        placeholder="Font Awesome Icon"
        value={reactionData.font_awesome_icon}
        onChange={handleChange}
      />
      <button type="submit">Add Reaction</button>
    </form>
  );
};

export default AddReaction;