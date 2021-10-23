import db from "../database/connection"


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

    return {...message, user}
  }
}



export { CreateMessageService }
