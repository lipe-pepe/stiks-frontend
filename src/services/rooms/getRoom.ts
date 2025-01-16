import getRoomJson from "@/utils/room/getRoomJson";

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

  return getRoomJson(data.room);
}

export default getRoom;
