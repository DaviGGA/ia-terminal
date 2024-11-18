import { Gemini } from "./models/gemini";
import 'dotenv/config'
import promptSync from "prompt-sync";

async function main() {

  const gemini = new Gemini();
  const chatSession = gemini.startChat([]);

  const prompt = promptSync();

  while(true) {
    const message = prompt("Digite sua mensagem: ");
    const response = await chatSession.sendMessage(message);
    console.log(response);
  }

}

main();