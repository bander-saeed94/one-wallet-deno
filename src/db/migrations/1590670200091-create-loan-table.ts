import { Migration } from "https://deno.land/x/nessie/mod.ts";
import { Schema } from "https://deno.land/x/nessie/qb.ts";

export const up: Migration<Schema> = ({ queryBuilder }) => {
  queryBuilder!.create("tbl_loan", (table) => {
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
  queryBuilder!.queryString(`
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
  return queryBuilder!.query;
};

export const down: Migration<Schema> = ({ queryBuilder }) => {
  queryBuilder!.drop("tbl_loan");
  queryBuilder!.queryString("DROP TYPE loan_status;");
  return queryBuilder!.query;
};
