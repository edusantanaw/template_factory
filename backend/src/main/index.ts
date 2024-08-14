import express from "express";

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

  public bootstrap() {
    this.middlewares();
    this.start();
  }
}

new Server().bootstrap();
