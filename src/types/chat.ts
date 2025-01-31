interface ChatMessage {
  player: string;
  message: string;
}

interface ChatLog {
  player: string;
  type: "game" | "join" | "leave";
  message: string;
}

export type { ChatMessage, ChatLog };
