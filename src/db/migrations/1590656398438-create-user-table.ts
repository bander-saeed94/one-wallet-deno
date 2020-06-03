import { Migration } from "https://deno.land/x/nessie/mod.ts";
import { Schema, dbDialects } from "https://deno.land/x/nessie/qb.ts";
import { database } from "../../../config/index.ts";

const dialect: dbDialects = database.migration_dialect as dbDialects;

export const up: Migration = () => {
   return new Schema(dialect).create("tbl_user", (table) => {
    table.uuid("id").primary();
    table.string("username", 25).notNullable().unique();
    table.string("email", 35).nullable().default("null").unique();
    table.numeric("phone_number", 12, 0).nullable().default("null").unique(); //9665xxxxxxxx
    table.string("fullname", 40);
    table.string("password", 100);
    table.boolean("email_confirmed").default("false");
    table.boolean("phone_number_confirmed").default("false");
    table.timestampsTz();
  });
};

export const down: Migration = () => {
  return new Schema(dialect).drop("tbl_user");
};
