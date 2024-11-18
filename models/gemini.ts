import { ChatSession, Content, GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { MessageInterface } from "./MessageInterface";

export class Gemini implements MessageInterface {
  
  private model: GenerativeModel

  constructor() {
    const genAI = new GoogleGenerativeAI(process.env.IA_API_KEY ?? "");
    this.model = genAI.getGenerativeModel({model: "gemini-1.5-flash",});
  }
  
  async sendMessage(message: string | Array<string>): Promise<string> {
    const result = await this.model.generateContent(message);
    return result.response.text();
  }

  startChat(history: Content[]): GeminiChat {
    const chatSession = this.model.startChat({history});
    return new GeminiChat(chatSession);
  }

}

class GeminiChat implements MessageInterface {

  private chat: ChatSession;

  constructor(chat: ChatSession) {
    this.chat = chat;
  }

  async sendMessage(message: string | Array<string>): Promise<string> {
    const response = await this.chat.sendMessage(message);
    return response.response.text();
  }

}