import { UserModel } from "../db/index.ts";

export default class UserService {
  register(
    username: string,
    password: string,
    fullname?: string,
    email?: string,
    phone_number?: number,
  ) {
    let user = {
      username,
      password,
      fullname: undefined || "",
      email: null,
      phone_number: null,
    };
    if (fullname!) {
      user.fullname = fullname!;
    }
    UserModel.create({
      username,
      password,
      fullname: fullname!,
      email: email!,
      phone_number: phone_number!,
    });
  }
}
