/**
 * creating elevator info table
 */
exports.up = async function(knex) {
      await knex.schema.createTable("elevators_info", (table) => {
        table.uuid("requestID").primary();
        table.string("elevatorID").notNullable();
        table.string("status").notNullable();
        table.string("direction").notNullable();
        table.string("currentFloor").notNullable();
        table.string("targetFloor").notNullable();
        table.string("destinationFloor").notNullable();
        table.boolean("doorsopen").notNullable();
      })
    };
    
    /**
     * dropping table
     */
    exports.down = async function(knex) {
      await knex.schema.dropTable("elevators_info");
    };