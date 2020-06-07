import { UserModel } from "../db/index.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { PostgresError } from "https://deno.land/x/postgres/error.ts";
import { hashPassword, validPassword } from "./../util/password.ts";
import { generateOtpAndSecret, validOtp } from "./../util/otp.ts";
import { sendSms } from "./../util/sms_sender.ts";
import { sendEmail } from "./../util/email_sender.ts";
import { User } from "./../db/domain/user.ts";
//todo read from env
const proto = "http";
const hostName = "localhost";
const port = "8080";

export default class UserService {
  static async registerByPhoneNumber(
    phoneNumber: number,
    password: string,
    fullname: string,
  ) {
    const username = await this.generateUsername(fullname);

    let userExist = await UserModel
      .select("id")
      .where("phone_number", phoneNumber)
      .where("phone_number_confirmed", true).all();
    if (userExist.length) {
      throw new Error("user already registered");
    }

    const hashedPassword = await hashPassword(password);
    const { otp, secret } = generateOtpAndSecret();

    await sendSms(phoneNumber, `please enter the otp: ${otp}`);
    const userIdUUID = v4.generate();
    try {
      await UserModel.create({
        id: userIdUUID,
        username,
        password: hashedPassword,
        fullname: fullname,
        phone_number: phoneNumber,
        otp_secret: secret,
      });
    } catch (error) {
      if (error instanceof PostgresError) {
        const pgError: PostgresError = error;
        console.log(pgError.message);
        console.log(pgError.fields.detail);
      } else {
        console.log(error);
      }
      throw new Error("error while inserting, However it might be inserted");
    }
  }

  static async registerByEmail(
    email: string,
    password: string,
    fullname: string,
  ) {
    const username = await this.generateUsername(fullname);

    let userExist = await UserModel
      .select("id")
      .where("email", email)
      .where("email_confirmed", true).all();
    if (userExist) {
      throw new Error("user already registered");
    }
    const hashedPassword = await hashPassword(password);

    const emailUUID = v4.generate();

    await sendEmail(
      email,
      "Confirm Email",
      `Welcome to One Wallet:
      Click link to confirm your email: ${proto}://${hostName}:${port}/confirm-email/${emailUUID}
      `,
    );

    const userIdUUID = v4.generate();
    UserModel.create({
      id: userIdUUID,
      username,
      password: hashedPassword,
      fullname,
      email: email,
      email_hash: emailUUID,
    });
  }

  static async loginByPhoneNumber(
    phoneNumber: number,
    password: string,
  ) {
    let user: User = await UserModel
      .select()
      .where("phone_number", phoneNumber)
      .first();

    if (!user) {
      throw new Error("user does not exist");
    }
    if (!await validPassword(password, user.password)) {
      throw new Error("Incorrect password");
    }

    //todo generate token
  }
  static async loginByEmail(
    email: string,
    password: string,
  ) {
    let user: User = await UserModel
      .select()
      .where("email", email)
      .first();

    if (!user) {
      throw new Error("user does not exist");
    }
    if (!await validPassword(password, user.password)) {
      throw new Error("Incorrect password");
    }
    //todo generate token

  }

  static async generateUsername(fullname: string): Promise<string> {
    let username: string = "";
    if (fullname) {
      username += fullname.trim().substring(0, fullname.indexOf(" "));
    } else {
      username += "username";
    }
    username += (Math.random() * 10000000 + 1).toFixed(0);
    //todo check username does not exist else regenerate again
    return username;
  }
}
