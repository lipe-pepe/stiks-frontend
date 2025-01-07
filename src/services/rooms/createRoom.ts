async function createRoom() {
  const url = "/api/rooms";
  const response = await fetch(url, {
    method: "POST",
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

export default createRoom;
