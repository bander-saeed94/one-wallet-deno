import { database } from "./config/index.ts";

const configPg = {
  migrationFolder: `./migrations`,
  connection: {
    database: database.name,
    hostname: database.hostname,
    port: database.port,
    user: database.user,
    password: database.password,
  },
  dialect: database.migration_dialect,
};

export default configPg;
