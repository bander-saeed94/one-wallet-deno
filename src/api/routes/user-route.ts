import { Router } from "https://deno.land/x/oak/mod.ts";

let router = new Router({
  prefix: "/api/v1/users",
});

router
  .get(`/`, (ctx) => {
    ctx.response.body = "some Users";
  });

export default router;
