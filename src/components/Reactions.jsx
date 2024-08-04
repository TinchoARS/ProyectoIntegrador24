// src/components/Reactions.jsx
import React, { useEffect, useState } from 'react';
import reactionService from '../services/reactionService';
import AddReaction from './AddReaction';
import ReactionItem from './ReactionItem';

function Reactions() {
  const [reactions, setReactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReactions = async () => {
    try {
      const data = await reactionService.getReactions();
      setReactions(data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReactions();
  }, []);

  const handleReactionAdded = () => {
    fetchReactions();
  };

  const handleReactionUpdated = () => {
    fetchReactions();
  };

  const handleReactionDeleted = () => {
    fetchReactions();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Reacciones</h2>
      <AddReaction onReactionAdded={handleReactionAdded} />
      <ul>
        {reactions.map((reaction) => (
          <ReactionItem
            key={reaction.id}
            reaction={reaction}
            onReactionUpdated={handleReactionUpdated}
            onReactionDeleted={handleReactionDeleted}
          />
        ))}
      </ul>
    </div>
  );
}

export default Reactions;
