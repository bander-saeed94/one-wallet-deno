import {
  DATA_TYPES,
  Model,
} from "https://deno.land/x/denodb/mod.ts";

export default class UserModel extends Model {
  static table = "tbl_user";
  static timestamps = true;

  static fields = {
    id: {
      primaryKey: true,
      type: DATA_TYPES.UUID,
    },
    username: {
      type: DATA_TYPES.STRING,
      unique: true,
      allowNull: false,
      length: 25,
      //validate regex no empty spaces
    },
    email: {
      type: DATA_TYPES.STRING,
      unique: true,
      allowNull: true,
      length: 35,
      //validate regex
    },
    phone_number: {
      type: DATA_TYPES.DECIMAL,
      precision: 12,
      scale: 0,
      allowNull: true,
      unique: true,
    },
    fullname: {
      type: DATA_TYPES.STRING,
      length: 40,
    },
    password: {
      type: DATA_TYPES.STRING,
      length: 60,
    },
    email_confirmed: DATA_TYPES.BOOLEAN,
    phone_number_confirmed: DATA_TYPES.BOOLEAN,
    email_hash: {
      type: DATA_TYPES.UUID,
    },
    otp_secret: {
      type: DATA_TYPES.STRING,
      length: 52,
    },
    created_at: DATA_TYPES.TIMESTAMP,
    updated_at: DATA_TYPES.TIMESTAMP,
  };

  static defaults = {
    email_confirmed: false,
    phone_number_confirmed: false,
  };
}
