import { Knex } from "knex"

export async function up(knex: Knex) {
  return knex.schema.createTable("messages", (table) => {
    table.increments("id").primary()
    table.string("text").notNullable()
    table.timestamp("created_at") // Cria um campo onde mostra o tempo que uma conexão foi criada
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"))
      .notNullable()

    table.integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
  })
}

export async function down(knex:Knex) {
  return knex.schema.dropTable("messages")
}
