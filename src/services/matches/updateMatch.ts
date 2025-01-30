async function updateMatch(id: string) {
  const url = `/api/matches/${id}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    status: response.status,
    data: await response.json(),
  };
}

export default updateMatch;
