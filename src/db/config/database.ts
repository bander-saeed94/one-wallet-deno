import {
  Database,
} from "https://deno.land/x/denodb/mod.ts";
import {
  DatabaseDialect,
} from "https://deno.land/x/denodb/lib/database.ts";
import { database } from "../../../config/index.ts";
import {
  UserModel,
  WalletModel,
  LoanModel,
  DepositModel,
  WalletInviteModel,
  WalletContributorModel,
} from "../index.ts";

// const db_dialect: DatabaseDialect = database.model_dialect;
const db_dialect: DatabaseDialect = "postgres";

const db = new Database(
  {
    dialect: db_dialect,
    debug: false,
  },
  {
    host: database.hostname,
    username: database.user,
    password: database.password,
    database: database.name,
    port: database.port,
  },
);

db.link(
  [
    UserModel,
    WalletModel,
    LoanModel,
    DepositModel,
    WalletInviteModel,
    WalletContributorModel,
  ],
);

export default db;
