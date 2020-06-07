import { Migration } from "https://deno.land/x/nessie/mod.ts";
import { Schema } from "https://deno.land/x/nessie/qb.ts";

export const up: Migration<Schema> = ({ queryBuilder }) => {
  queryBuilder!.create("tbl_wallet", (table) => {
    table.uuid("id").primary();
    table.uuid("admin_id");
    table.string("name", 100)
      .default("update wallet name");
    table.timestampsTz();
  });
  queryBuilder!.queryString(`
    ALTER TABLE tbl_wallet
    ADD CONSTRAINT fk_tbl_wallet_tbl_user
    FOREIGN KEY (admin_id)
    REFERENCES tbl_user(id)
    ON DELETE CASCADE;
    `);
  return queryBuilder!.query;
};

export const down: Migration<Schema> = ({ queryBuilder }) => {
  return queryBuilder!.drop("tbl_wallet");
};
