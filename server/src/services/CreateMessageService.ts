import db from "../database/connection"

import { io } from "../app"

class CreateMessageService {
  async execute(text: string, user_id: string) {
    const [id] = await db("messages").insert({
      text,
      user_id
    })

    const [ message ] = await db("messages")
      .where("messages.id", "=", id)
      .select(["messages.id", "messages.text", "messages.created_at"])

    const [ user ] = await db("users").where("users.id", "=", user_id).select("*")


    const infoWS = {
      text: message.text,
      user_id: user.id,
      created_at: message.created_at,
      user:  {
        name: user.name,
        avatar_url: user.avatar_url
      }
    }

    io.emit("new_message", infoWS)

    return {...message, user}
  }
}



export { CreateMessageService }
