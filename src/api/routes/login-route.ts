import { Router } from "https://deno.land/x/oak/mod.ts";
import UserService from "../../services/user-service.ts";

import { LoginDto } from "./dto/user-login-dto.ts";
let router = new Router({
  prefix: "/api/v1/login",
});

router
  .post("/", async (ctx) => {
    try {
      const user: LoginDto = (await ctx.request.body()).value;
      if (/^[0-9]{12}$/.test(user.phoneNumberOrEmail)) {
        await UserService.loginByPhoneNumber(
          Number.parseInt(user.phoneNumberOrEmail),
          user.password,
        );
      } else {
        await UserService.loginByEmail(
          user.phoneNumberOrEmail,
          user.password,
        );
      }
      ctx.response.status = 200; //created
    } catch (error) {
      console.log(error);
      ctx.response.body = error;
    }
  });

export default router;
