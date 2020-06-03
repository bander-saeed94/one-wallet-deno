import { Migration } from "https://deno.land/x/nessie/mod.ts";
import { Schema, dbDialects } from "https://deno.land/x/nessie/qb.ts";
import { database } from "../../../config/index.ts";

const dialect: dbDialects = database.migration_dialect as dbDialects;

export const up: Migration = () => {
  const schema = new Schema(dialect);

  schema.create("tbl_deposit", (table) => {
    table.uuid("id").primary();
    table.uuid("user_id");
    table.uuid("wallet_id");
    table.money("amount");
    table.enum(
      "deposit_type",
      ["monthlyContribution", "monthlyInstallment"],
    );
    table.uuid("loan_id").nullable();
    table.enum(
      "deposit_status",
      ["instantiated", "approved", "rejected"],
    )
    .default("'instantiated'");// fix nessie
    table.timestampsTz();
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
  return schema.query;
};

export const down: Migration = () => {
  const schema = new Schema(dialect);
  schema.drop("tbl_deposit");
  schema.queryString("DROP TYPE deposit_type;");
  schema.queryString("DROP TYPE deposit_status;");
  return schema.query;
};
