import { Knex } from "knex"

export async function up(knex: Knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary()
    table.integer("github_id").notNullable()
    table.string("name").notNullable()
    table.string("avatar_url").notNullable()
    table.string("login").notNullable()
  })
}

export async function down(knex:Knex) {
  return knex.schema.dropTable("users")
}
