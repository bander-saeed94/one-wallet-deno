import Behin from "https://deno.land/x/behin/mod.ts";

const step = 60 * 5; // valid for 5 minutes
const digits = 4; // generate otp consist of 4 digits

export const generateOtpAndSecret = function () {
  const secret = Behin.generateSecret(); //save in user table as otp_secret
  const token = Behin.totp.generate(secret, {
    step,
    digits,
  });
  return { secret, otp: token };
};

export const validOtp = function (
  secret: string,
  token: string,
): boolean {
  return Behin.totp.verify(secret, token, {
    step,
    digits,
  });
};
