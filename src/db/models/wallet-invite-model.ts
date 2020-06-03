import {
  DATA_TYPES,
  Model,
} from "https://deno.land/x/denodb/mod.ts";

export default class WalletInviteModel extends Model {
  static table = "tbl_wallet_invite";
  static timestamps = true;

  static fields = {
    user_id: {
      type: DATA_TYPES.UUID,
      allowNull: false,
    },
    wallet_id: {
      type: DATA_TYPES.UUID,
      allowNull: false,
    },
    accepted: {
      type: DATA_TYPES.BOOLEAN,
    },
    created_at: DATA_TYPES.TIMESTAMP,
    updated_at: DATA_TYPES.TIMESTAMP,
  };

  static defaults = {
    accepted: false,
  };
}
