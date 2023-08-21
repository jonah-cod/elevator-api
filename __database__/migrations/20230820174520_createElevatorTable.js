exports.up = async function (knex) {
  await knex.schema.createTable("elevators", (table) => {
    table.uuid("id").primary();
    table.string("capacity").notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("elevators");
};
