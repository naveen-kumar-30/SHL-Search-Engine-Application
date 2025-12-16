const { Client } = require("@elastic/elasticsearch");

module.exports = new Client({
  node: process.env.ELASTIC_NODE,
  auth: {
    apiKey: process.env.ELASTIC_API_KEY
  }
});
