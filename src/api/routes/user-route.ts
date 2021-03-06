import { Router } from "https://deno.land/x/oak/mod.ts";
import UserService from "../../services/user-service.ts";

import { RegisterDto } from "./dto/user-register-dto.ts";
let router = new Router({
  prefix: "/api/v1/users",
});

router
  .get(`/`, (ctx) => {
    ctx.response.body = "some Users";
  })
  .post("/", async (ctx) => {
    try {
      const user: RegisterDto = (await ctx.request.body()).value;
      if (/^[0-9]{12}$/.test(user.phoneNumberOrEmail)) {
        await UserService.registerByPhoneNumber(
          Number.parseInt(user.phoneNumberOrEmail),
          user.password,
          user.fullname,
        );
      } else {
        await UserService.registerByEmail(
          user.phoneNumberOrEmail,
          user.password,
          user.fullname,
        );
      }

      ctx.response.status = 201; //created
    } catch (error) {
      console.log(error);
      ctx.response.body = error;
    }
  });

export default router;
