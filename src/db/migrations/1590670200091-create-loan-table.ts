import { Migration } from "https://deno.land/x/nessie/mod.ts";
import { Schema, dbDialects } from "https://deno.land/x/nessie/qb.ts";
import { database } from "../../../config/index.ts";

const dialect: dbDialects = database.migration_dialect as dbDialects;

export const up: Migration = () => {
  const schema = new Schema(dialect);

  schema.create("tbl_loan", (table) => {
    table.uuid("id").primary();
    table.uuid("user_id");
    table.uuid("wallet_id");
    table.numeric("amount", 6, 2);
    table.enum(
      "loan_status",
      ["instantiated", "approved", "rejected"],
    )
      .default("instantiated");
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
  return schema.query;
};

export const down: Migration = () => {
  const schema = new Schema(dialect);
  schema.drop("tbl_loan");
  schema.queryString("DROP TYPE loan_status;");
  return schema.query;
};
