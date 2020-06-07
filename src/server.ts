import { Application } from "https://deno.land/x/oak/mod.ts";
import UserRouter from "./api/routes/user-route.ts";
import LoginRouter from "./api/routes/login-route.ts";
import "./db/load-db-models.ts";
import { connectPg, closePg } from "./bootstrap/pg-client-bootstrap.ts";

try {
  await connectPg();
  console.log("connect to db success");
} catch (error) {
  console.log(error);
  throw new Error("exist app");
}

const app = new Application();

app.use(UserRouter.routes());
app.use(UserRouter.allowedMethods());
app.use(LoginRouter.routes());
app.use(LoginRouter.allowedMethods());

app.use((ctx) => {
  console.log(ctx.request.url);
  ctx.response.body = "wait a moment";
});
app.listen({ port: 8000 })
  .catch((v: any) => {
    console.log("something went wrong, server could not start", v);
  });
console.log("server is listening");
