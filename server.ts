import { Application, Router } from "https://deno.land/x/oak/mod.ts";
const app = new Application();
const router = new Router();

router
  .get("/", (ctx) => {
    ctx.response.body = "Welcome to One Wallet api";
  });

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 })
  .catch((v: any) => {
    console.log("something went wrong, server could not start", v);
  });
console.log("server started");
