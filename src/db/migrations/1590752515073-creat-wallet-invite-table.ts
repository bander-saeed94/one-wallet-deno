import { Migration } from "https://deno.land/x/nessie/mod.ts";
import { Schema, dbDialects } from "https://deno.land/x/nessie/qb.ts";
import { database } from "../../../config/index.ts";

const dialect: dbDialects = database.migration_dialect as dbDialects;

export const up: Migration = () => {
  const schema: Schema = new Schema(dialect);
  schema.create("tbl_wallet_invite", (table) => {
    table.primary("user_id", "wallet_id");
    table.uuid("user_id");
    table.uuid("wallet_id");
    table.boolean("accepted").default(false);
    table.timestampsTz();
  });
  schema.queryString(`
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
  return schema.query;
};

export const down: Migration = () => {
  return new Schema(dialect).drop("tbl_wallet_invite");
};
