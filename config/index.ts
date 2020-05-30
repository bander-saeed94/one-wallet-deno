import { config } from "https://deno.land/x/dotenv/mod.ts";

const env = config();

const database = {
  user: env.DB_USER,
  password: env.DB_PASS,
  name: env.DB_NAME,
  port: Number.parseInt(env.DB_PORT),
  hostname: env.DB_HOST,
  migration_dialect: env.DB_MIGRATIONS_DIALECT,
  model_dialect: env.DB_MODEL_DIALECT,
};

export {
  database,
};
