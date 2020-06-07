import { Client } from "https://deno.land/x/postgres/mod.ts";
import {database} from './../../config/index.ts';
export const clientPg: Client = new Client({
  user: database.user,
  database: database.name,
  hostname: database.hostname,
  port: database.port,
});

export const connectPg = async () => {
  return await clientPg.connect();
};

export const closePg = async () => {
  return await clientPg.end();
};