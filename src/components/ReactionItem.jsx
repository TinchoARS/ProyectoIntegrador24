import React, { useState, useEffect } from 'react';

function ReactionItem({ reaction, onReactionUpdated, onReactionDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(reaction.name);
  const [description, setDescription] = useState(reaction.description);
  const [fontAwesomeIcon, setFontAwesomeIcon] = useState(reaction.font_awesome_icon);

  useEffect(() => {
    setName(reaction.name);
    setDescription(reaction.description);
    setFontAwesomeIcon(reaction.font_awesome_icon);
  }, [reaction]);

  const handleUpdate = () => {
    onReactionUpdated(reaction.id, { name, description, font_awesome_icon: fontAwesomeIcon });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onReactionDeleted(reaction.id);
  };

  return (
    <li>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            value={fontAwesomeIcon}
            onChange={(e) => setFontAwesomeIcon(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{name} <i className={fontAwesomeIcon}></i></p>
          <p>{description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </li>
  );
}

export default ReactionItem;
