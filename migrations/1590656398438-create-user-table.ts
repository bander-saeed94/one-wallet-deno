import { Schema } from "https://deno.land/x/nessie/mod.ts";

export const up = (schema: Schema): void => {
  schema.create("tbl_user", (table) => {
    table.uuid("id").primary();
    table.string("username", 25).notNullable().unique();
    table.string("email", 35).nullable().default("null").unique();
    table.decimal("phone_number", 12, 0).nullable().default("null").unique(); //9665xxxxxxxx
    table.string("fullname", 40);
    table.string("password", 100);
    table.boolean("email_confirmed").default("false");
    table.boolean("phone_number_confirmed").default("false");
    table.timestampsTz();
  });
};

export const down = (schema: Schema): void => {
  schema.drop("tbl_user");
};
