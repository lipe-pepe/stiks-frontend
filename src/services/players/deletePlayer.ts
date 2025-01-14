async function deletePlayer(playerId: string) {
  const url = `/api/players/${playerId}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return {
    status: response.status,
    data: await response.json(),
  };
}

export default deletePlayer;
