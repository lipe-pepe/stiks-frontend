import getMatchJson from "@/utils/match/getMatchJson";

async function getMatch(id: string) {
  const url = `/api/matches/${id}`;
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

  return getMatchJson(data.match);
}

export default getMatch;
