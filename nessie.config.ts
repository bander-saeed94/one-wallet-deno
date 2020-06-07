import { database } from "./config/index.ts";
import { ClientPostgreSQL } from "https://deno.land/x/nessie/mod.ts";

const nessieOptions = {
  migrationFolder: "./src/db/migrations",
  seedFolder: "./db/seeds",
};

const connectionOptions = {
  database: database.name,
  hostname: database.hostname,
  port: database.port,
  user: database.user,
  password: database.password,
};

export default {
  client: new ClientPostgreSQL(nessieOptions, connectionOptions),
  exposeQueryBuilder: true,
};
