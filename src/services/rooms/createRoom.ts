async function createRoom() {
  const url = "/api/rooms";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    status: response.status,
    data: await response.json(),
  };
}

export default createRoom;
