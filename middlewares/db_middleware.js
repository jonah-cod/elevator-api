const { db_helper } = require("../__database__/helpers/db_helper");
const { db_config } = require("../__database__/db_config");
const IP = require("ip");
const {randomUUID} = require("crypto")

const db_middleware = [
  async (req, res, next) => {
    /**
     * get db connection
     */
    const connection = await db_config.client.acquireConnection();

    const db_context = db_helper(connection);

    res.on("close", () => db_config.client.releaseConnection(connection));
    req.db_context = db_context;
    next();
  },

  async (req, res, next) => {
    /**
     * log user requests
     */
    const ip_address = IP.address();
    const { method, url, query, db_context } = req;
    const timestamp = new Date().toISOString();
    
    db_context.insert('requests_log', {request_id: randomUUID(), ip_address, url, method, details: JSON.stringify(query), timestamp})
    
    next();
  },
];

module.exports = { db_middleware };
