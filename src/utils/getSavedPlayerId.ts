function getSavedPlayerId() {
  // Recupera o nome do jogador do localStorage
  return localStorage.getItem("playerId");
}

export default getSavedPlayerId;
