interface ChatMessage {
  player: string;
  message: string;
}

interface ChatLog {
  player: string;
  type: "game" | "join" | "leave";
  message: string;
  value?: number;
}

export type { ChatMessage, ChatLog };
