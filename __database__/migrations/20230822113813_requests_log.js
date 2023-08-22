
exports.up = async function(knex) {
      await knex.schema.createTable('requests_log', (table)=>{
            table.uuid("request_id").primary()
            table.string("ip_address").notNullable()
            table.string("url").notNullable
            table.string("method").notNullable()
            table.string("details")
            table.dateTime("timestamp").notNullable()
      }) 
      
};

exports.down = async function(knex) {
  await knex.schema.dropTable("requests_log")
};
