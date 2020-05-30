import { Schema } from "https://deno.land/x/nessie/mod.ts";

export const up = (schema: Schema): void => {
  schema.create("tbl_wallet", (table) => {
    table.uuid("id").primary();
    table.uuid("admin_id");
    table.string("name", 100).default("update wallet name");
    table.timestampsTz();
  });
  schema.queryString(`
    ALTER TABLE tbl_wallet
    ADD CONSTRAINT fk_tbl_wallet_tbl_user
    FOREIGN KEY (admin_id)
    REFERENCES tbl_user(id)
    ON DELETE CASCADE;
    `);
};

export const down = (schema: Schema): void => {
  schema.drop("tbl_wallet");
};
