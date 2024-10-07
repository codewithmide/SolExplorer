export interface ChatMessage {
    role: "user" | "ai";
    content: string;
    timestamp: Date | string;
}
