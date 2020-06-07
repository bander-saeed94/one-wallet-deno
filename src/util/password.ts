import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password);
};

export const validPassword = async function (
  password: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
};
