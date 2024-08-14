import express from "express";
import "reflect-metadata";
import typeorm from "./config/typeorm";
import env from "./config/env";

env();

const PORT = process.env.PORT ?? 8080;

class Server {
  private app = express();

  private middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
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
