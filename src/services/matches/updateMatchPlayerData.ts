interface UpdateInterface {
  chosen?: number;
  guess?: number;
  revealed?: boolean;
}

async function updateMatchPlayerData(
  id: string,
  playerId: string,
  update: UpdateInterface
) {
  const url = `/api/matches/${id}/player/${playerId}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ update }),
  });

  console.log(response);

  return {
    status: response.status,
    data: await response.json(),
  };
}

export default updateMatchPlayerData;
