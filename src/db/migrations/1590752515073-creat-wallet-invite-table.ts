import { Migration } from "https://deno.land/x/nessie/mod.ts";
import { Schema } from "https://deno.land/x/nessie/qb.ts";

export const up: Migration<Schema> = ({ queryBuilder }) => {
  queryBuilder!.create("tbl_wallet_invite", (table) => {
    table.primary("user_id", "wallet_id");
    table.uuid("user_id");
    table.uuid("wallet_id");
    table.boolean("accepted").default(false);
    table.timestampsTz();
  });
  queryBuilder!.queryString(`
    ALTER TABLE tbl_wallet_invite
    ADD CONSTRAINT fk_tbl_wallet_invite_tbl_user
    FOREIGN KEY (user_id)
    REFERENCES tbl_user(id)
    ON DELETE CASCADE;

    ALTER TABLE tbl_wallet_invite
    ADD CONSTRAINT fk_tbl_wallet_invite_tbl_wallet
    FOREIGN KEY (wallet_id)
    REFERENCES tbl_wallet(id)
    ON DELETE CASCADE;
    `);
  return queryBuilder!.query;
};

export const down: Migration<Schema> = ({ queryBuilder }) => {
  return queryBuilder!.drop("tbl_wallet_invite");
};
