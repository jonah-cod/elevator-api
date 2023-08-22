/**
 * creating elevator info table
 */
exports.up = async function(knex) {
      await knex.schema.createTable("elevators_info", (table) => {
        table.uuid("elevatorID").primary();
        table.string("status").notNullable();
        table.string("direction").notNullable();
        table.integer("currentFloor");
        table.integer("targetFloor");
        table.integer("destinationFloor");
        table.boolean("doorsOpen").notNullable();
      })
    };
    
    /**
     * dropping table
     */
    exports.down = async function(knex) {
      await knex.schema.dropTable("elevators_info");
    };