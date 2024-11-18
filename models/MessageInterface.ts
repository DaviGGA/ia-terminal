
export interface MessageInterface {
  sendMessage(message: string | Array<string>): Promise<string>
}