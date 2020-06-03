import { Application } from "https://deno.land/x/oak/mod.ts";
import UserRouter from "./api/routes/user-route.ts";
// import ApiRouter from "./api/index.ts";

const app = new Application();

app.use(UserRouter.routes());
app.use(UserRouter.allowedMethods());

app.use((ctx) => {
  console.log(ctx.request.url);
  ctx.response.body = "wait a moment";
});

await app.listen({ port: 8000 })
  .catch((v: any) => {
    console.log("something went wrong, server could not start", v);
  });
