//Connects database to server, pool is used to run queries

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "password",
  host: "localhost",
  database: "pernstack", //name of db
  port: 5433, //pretty sure, he put 5432
});

module.exports = pool; //this just exports pool so you can reuse it later on
