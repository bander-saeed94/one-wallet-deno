import { Schema } from "https://deno.land/x/nessie/mod.ts";

export const up = (schema: Schema): void => {
  schema.create("tbl_loan", (table) => {
    table.uuid("id").primary();
    table.uuid("user_id");
    table.uuid("wallet_id");
    table.money("amount");
    table.enum(
      "loan_status",
      ["'instantiated'", "'approved'", "'reject'"],
    ).default("'instantiated'");
    table.timestampsTz();
  });
  schema.queryString(`
    ALTER TABLE tbl_loan
    ADD CONSTRAINT fk_tbl_loan_tbl_user
    FOREIGN KEY (user_id)
    REFERENCES tbl_user(id)
    ON DELETE CASCADE;
    
    ALTER TABLE tbl_loan
    ADD CONSTRAINT fk_tbl_loan_tbl_wallet
    FOREIGN KEY (wallet_id)
    REFERENCES tbl_wallet(id)
    ON DELETE CASCADE;
    `);
};

export const down = (schema: Schema): void => {
  schema.drop("tbl_loan");
  schema.queryString("DROP TYPE loan_status;");
};
