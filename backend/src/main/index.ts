import express from "express";
import "reflect-metadata";
import typeorm from "./config/typeorm";
import env from "./config/env";
import routes from "./routes";

env();

const PORT = process.env.PORT ?? 8080;

class Server {
  private app = express();

  private middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(routes());
  }

  private start() {
    const cb = () => console.log(`Server running at ${PORT}`);
    this.app.listen(PORT, cb);
  }

  public async bootstrap() {
    this.middlewares();
    await typeorm();
    this.start();
  }
}

new Server().bootstrap();
