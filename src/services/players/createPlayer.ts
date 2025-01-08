import { PlayerCreation } from "@/types/player";

async function createPlayer(roomCode: string, player: PlayerCreation) {
  const url = "/api/players";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ roomCode, player }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return {
    status: response.status,
    data: await response.json(),
  };
}

export default createPlayer;
