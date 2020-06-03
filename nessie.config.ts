import { database } from "./config/index.ts";
import {
  ClientPostgreSQL,
  nessieConfig,
} from "https://deno.land/x/nessie/mod.ts";
const migrationFolder = "./src/db/migrations";

const config: nessieConfig = {
  client: new ClientPostgreSQL(migrationFolder, {
    database: database.name,
    hostname: database.hostname,
    port: database.port,
    user: database.user,
    password: database.password,
  }),
};

export default config;
