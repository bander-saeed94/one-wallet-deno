import { Migration } from "https://deno.land/x/nessie/mod.ts";
import { Schema } from "https://deno.land/x/nessie/qb.ts";

export const up: Migration<Schema> = ({ queryBuilder }) => {
  return queryBuilder.create("tbl_user", (table) => {
    table.uuid("id").primary();
    table.string("username", 25).notNullable().unique();
    table.string("email", 35).nullable().default(null).unique();
    table.numeric("phone_number", 12, 0).nullable().default(null).unique(); //9665xxxxxxxx
    table.string("fullname", 40);
    table.char("password", 60);
    table.boolean("email_confirmed").default(false);
    table.boolean("phone_number_confirmed").default(false);
    table.uuid("email_hash");
    table.char("otp_secret", 52);
    table.timestampsTz();
  });
};

export const down: Migration<Schema> = ({ queryBuilder }) => {
  return queryBuilder.drop("tbl_user");
};
