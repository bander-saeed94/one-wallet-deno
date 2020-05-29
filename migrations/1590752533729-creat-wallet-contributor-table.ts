import { Schema } from "https://deno.land/x/nessie/mod.ts";

export const up = (schema: Schema): void => {
  schema.create("tbl_wallet_contributor", (table) => {
    table.primary("user_id", "wallet_id");
    table.uuid("user_id");
    table.uuid("wallet_id");
    table.timestampsTz();
  });
  schema.queryString(`
    ALTER TABLE tbl_wallet_contributor
    ADD CONSTRAINT fk_tbl_wallet_contributor_tbl_user
    FOREIGN KEY (user_id)
    REFERENCES tbl_user(id)
    ON DELETE CASCADE;

    ALTER TABLE tbl_wallet_contributor
    ADD CONSTRAINT fk_tbl_wallet_contributor_tbl_wallet
    FOREIGN KEY (wallet_id)
    REFERENCES tbl_wallet(id)
    ON DELETE CASCADE;
    `);
};

export const down = (schema: Schema): void => {
  schema.drop("tbl_wallet_contributor");
};
