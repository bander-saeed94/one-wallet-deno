import { Migration } from "https://deno.land/x/nessie/mod.ts";
import { Schema } from "https://deno.land/x/nessie/qb.ts";

export const up: Migration<Schema> = ({ queryBuilder }) => {
  queryBuilder.create("tbl_deposit", (table) => {
    table.uuid("id").primary();
    table.uuid("user_id");
    table.uuid("wallet_id");
    table.numeric("amount", 6, 2);
    table.enum(
      "deposit_type",
      ["monthlyContribution", "monthlyInstallment"],
    );
    table.uuid("loan_id").nullable();
    table.enum(
      "deposit_status",
      ["instantiated", "approved", "rejected"],
    )
      .default("instantiated");
    table.timestampsTz();
  });
  queryBuilder.queryString(`
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
  return queryBuilder.query;
};

export const down: Migration<Schema> = ({ queryBuilder }) => {
  queryBuilder.drop("tbl_deposit");
  queryBuilder.queryString("DROP TYPE deposit_type;");
  queryBuilder.queryString("DROP TYPE deposit_status;");
  return queryBuilder.query;
};
