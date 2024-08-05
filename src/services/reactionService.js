let localReactions = [];
let nextLocalId = 1;

const reactionService = {
  initializeReactions: async () => {
    const response = await fetch('https://sandbox.academiadevelopers.com/infosphere/reactions/');
    const data = await response.json();
    localReactions = data.results;
    nextLocalId = Math.max(...localReactions.map(r => r.id), 0) + 1;
    console.log('Reacciones inicializadas:', localReactions);
    return localReactions;
  },

  getReactions: () => {
    console.log('Obteniendo reacciones:', localReactions);
    return Promise.resolve(localReactions);
  },

  addReaction: (newReaction) => {
    const reactionWithId = { ...newReaction, id: nextLocalId++ };
    localReactions = [...localReactions, reactionWithId];
    console.log('Reacción agregada:', reactionWithId);
    console.log('Estado actual de reacciones:', localReactions);
    return Promise.resolve(reactionWithId);
  },

  updateReaction: (id, updatedReaction) => {
    const index = localReactions.findIndex(r => r.id === id);
    if (index !== -1) {
      localReactions[index] = { ...localReactions[index], ...updatedReaction };
      return Promise.resolve(localReactions[index]);
    }
    return Promise.reject(new Error('Reaction not found'));
  },

  deleteReaction: (id) => {
    const index = localReactions.findIndex(r => r.id === id);
    if (index !== -1) {
      localReactions.splice(index, 1);
      return Promise.resolve();
    }
    return Promise.reject(new Error('Reaction not found'));
  }
};

export default reactionService;