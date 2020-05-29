import { Schema } from "https://deno.land/x/nessie/mod.ts";

export const up = (schema: Schema): void => {
  schema.create("tbl_wallet_invite", (table) => {
    table.primary("user_id", "wallet_id");
    table.uuid("user_id");
    table.uuid("wallet_id");
    table.boolean("accepted").default("false");
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
};

export const down = (schema: Schema): void => {
  schema.drop("tbl_wallet_invite");
};
