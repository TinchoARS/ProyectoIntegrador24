import React, { useEffect, useState, useCallback } from 'react';
import reactionService from '../services/reactionService';
import AddReaction from './AddReaction';
import ReactionItem from './ReactionItem';

function Reactions() {
  const [reactions, setReactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReactions = useCallback(async () => {
    try {
      const data = await reactionService.getReactions();
      setReactions(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initializeData = async () => {
      try {
        await reactionService.initializeReactions();
        fetchReactions();
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    initializeData();
  }, [fetchReactions]);

  const handleReactionAdded = useCallback(async (newReaction) => {
    try {
      const addedReaction = await reactionService.addReaction(newReaction);
      setReactions(prevReactions => {
        const updatedReactions = [...prevReactions, addedReaction];
        console.log('Reacciones actualizadas después de agregar:', updatedReactions);
        return updatedReactions;
      });
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const handleReactionUpdated = useCallback(async (id, updatedReaction) => {
    try {
      const updated = await reactionService.updateReaction(id, updatedReaction);
      setReactions(prevReactions => 
        prevReactions.map(reaction => 
          reaction.id === id ? updated : reaction
        )
      );
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const handleReactionDeleted = useCallback(async (id) => {
    try {
      await reactionService.deleteReaction(id);
      setReactions(prevReactions => 
        prevReactions.filter(reaction => reaction.id !== id)
      );
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    console.log('Estado de reacciones actualizado:', reactions);
  }, [reactions]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log('Renderizando Reactions. Número de reacciones:', reactions.length);

  return (
    <div>
      <h2>Reactions</h2>
      <AddReaction onReactionAdded={handleReactionAdded} />
      <ul>
        {reactions.map((reaction) => (
          <ReactionItem
            key={`reaction-${reaction.id}-${reaction.name}`}
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