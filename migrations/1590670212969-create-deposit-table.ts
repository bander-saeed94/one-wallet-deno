import { Schema } from "https://deno.land/x/nessie/mod.ts";

export const up = (schema: Schema): void => {
  schema.create("tbl_deposit", (table) => {
    table.uuid("id").primary();
    table.uuid("user_id");
    table.uuid("wallet_id");
    table.money("amount");
    table.enum(
      "deposit_type",
      ["'monthlyContribution'", "'monthlyInstallment'"],
    );
    table.uuid("loan_id").nullable();
    table.enum(
      "deposit_status",
      ["'instantiated'", "'approved'", "'reject'"],
    ).default("'instantiated'");
    table.timestampsTz();
    console.log(table.toSql());
  });
  schema.queryString(`
    ALTER TABLE tbl_deposit
    ADD CONSTRAINT fk_tbl_deposit_tbl_user
    FOREIGN KEY (user_id)
    REFERENCES tbl_user(id)
    ON DELETE CASCADE;

    ALTER TABLE tbl_deposit
    ADD CONSTRAINT fk_tbl_deposit_tbl_wallet
    FOREIGN KEY (wallet_id)
    REFERENCES tbl_wallet(id)
    ON DELETE CASCADE;

    ALTER TABLE tbl_deposit
    ADD CONSTRAINT fk_tbl_deposit_tbl_loan
    FOREIGN KEY (loan_id)
    REFERENCES tbl_loan(id)
    ON DELETE CASCADE;
    `);
};

export const down = (schema: Schema): void => {
  schema.drop("tbl_deposit");
  schema.queryString("DROP TYPE deposit_type;");
  schema.queryString("DROP TYPE deposit_status;");
};
