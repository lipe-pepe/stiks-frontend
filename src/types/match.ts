enum MatchStatus {
  choosing = "choosing",
  guessing = "guessing",
  revealing = "revealing",
  results = "results",
}

interface Match {
  round: number;
  status: MatchStatus;
}

export { MatchStatus };
export type { Match };
