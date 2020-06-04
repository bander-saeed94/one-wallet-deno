import { Migration } from "https://deno.land/x/nessie/mod.ts";
import { Schema, dbDialects } from "https://deno.land/x/nessie/qb.ts";
import { database } from "../../../config/index.ts";

const dialect: dbDialects = database.migration_dialect as dbDialects;

export const up: Migration = () => {
  const schema = new Schema(dialect);
  schema.create("tbl_wallet", (table) => {
    table.uuid("id").primary();
    table.uuid("admin_id");
    table.string("name", 100)
      .default("update wallet name");
    table.timestampsTz();
  });
  schema.queryString(`
    ALTER TABLE tbl_wallet
    ADD CONSTRAINT fk_tbl_wallet_tbl_user
    FOREIGN KEY (admin_id)
    REFERENCES tbl_user(id)
    ON DELETE CASCADE;
    `);
  return schema.query;
};

export const down: Migration = () => {
  return new Schema(dialect).drop("tbl_wallet");
};
