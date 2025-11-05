import { type Request, type Response, Router } from "express";
import authRouter from "./auth.route.ts";
import userRouter from "./user.route.ts";
import bannerRouter from "./banner.route.ts";
import serviceRouter from "./service.route.ts";
import transactionRouter from "./transaction.route.ts";

const mainRouter = Router();

mainRouter.get("/ping", (req: Request, res: Response) => {
  return res.status(200).json("pong");
});

mainRouter.use("/", authRouter);
mainRouter.use(userRouter);
mainRouter.use(bannerRouter);
mainRouter.use(serviceRouter);
mainRouter.use(transactionRouter);

export default mainRouter;
