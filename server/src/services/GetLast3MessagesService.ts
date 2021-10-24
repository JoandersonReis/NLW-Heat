import db from "../database/connection"

class GetLast3MessagesService {
  async execute() {
    const messages = await db("messages")
      .select("*")
      .limit(3)
      .orderBy("created_at", "desc")
      .join("users", "users.id", "=", "messages.user_id")
      .distinct("users.id", "messages.id")

    const messagesFormat = messages.map(message => (
        {
          id: message.id,
          text: message.text,
          created_at: message.created_at,
          user_id: message.user_id,
          user: { 
            github_id: message.github_id,
            name: message.name,
            avatar_url: message.avatar_url,
            login: message.login
          }
        }
      )) 



    return messagesFormat
  }
}



export { GetLast3MessagesService }
