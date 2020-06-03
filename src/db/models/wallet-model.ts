import {
  DATA_TYPES,
  Model,
} from "https://deno.land/x/denodb/mod.ts";

export default class WalletModel extends Model {
  static table = "tbl_wallet";
  static timestamps = true;

  static fields = {
    id: {
      primaryKey: true,
      type: DATA_TYPES.UUID,
    },
    admin_id: {
      type: DATA_TYPES.UUID,
      allowNull: false,
    },
    name: {
      type: DATA_TYPES.STRING,
      length: 100,
    },
    created_at: DATA_TYPES.TIMESTAMP,
    updated_at: DATA_TYPES.TIMESTAMP,
  };

  static defaults = {
    wallet_name: "update wallet name",
  };
}
