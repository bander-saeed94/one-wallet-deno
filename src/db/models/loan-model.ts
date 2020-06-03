import {
  DATA_TYPES,
  Model,
} from "https://deno.land/x/denodb/mod.ts";

export default class LoanModel extends Model {
  static table = "tbl_loan";
  static timestamps = true;

  static fields = {
    id: {
      primaryKey: true,
      type: DATA_TYPES.UUID,
    },
    user_id: {
      type: DATA_TYPES.UUID,
      allowNull: false,
    },
    wallet_id: {
      type: DATA_TYPES.UUID,
      allowNull: false,
    },
    amount: {
      type: DATA_TYPES.DECIMAL,
      precision: 8,
      scale: 2,
      allowNull: false,
    },
    loan_status: {
      type: DATA_TYPES.ENUM,
      values: ["instantiated", "approved", "rejected"],
    },
    created_at: DATA_TYPES.TIMESTAMP,
    updated_at: DATA_TYPES.TIMESTAMP,
  };

  static defaults = {
    amount: 0.0,
    loan_status: "instantiated",
  };
}
