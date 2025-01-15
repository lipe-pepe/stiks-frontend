async function getRoom(roomCode: string) {
  const url = `/api/rooms/${roomCode}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  console.log(data);

  return {
    code: data.room.code, // Código da sala
    players: data.room.players, // Lista de jogadores
    round: data.room.round, // Número da rodada
    status: data.room.status, // Status da partida
    firstTurn: data.room.first_turn, // Primeiro jogador a jogar na partida
  };
}

export default getRoom;
