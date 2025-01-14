async function createMatch(roomCode: string) {
  const url = "/api/matches";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ roomCode }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return {
    status: response.status,
    data: await response.json(),
  };
}

export default createMatch;
