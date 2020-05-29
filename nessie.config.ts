import { config } from "https://deno.land/x/dotenv/mod.ts";

const env = config();

const configPg = {
  migrationFolder: `./migrations`,
  connection: {
    database: env.DB_NAME,
    hostname: env.DB_HOST,
    port: Number.parseInt(env.DB_PORT),
    user: env.DB_USER,
    password: env.DB_PASS,
  },
  dialect: env.DB_DIALECT,
};

export default configPg;
