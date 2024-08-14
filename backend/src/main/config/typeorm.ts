import { DataSource } from "typeorm";
import env from "./env";
import { ReplaceableKeyDbEntity, TemplateDbEntity } from "../../infra/entities";

env();

const HOST = process.env.DB_HOST;
const PORT = process.env.DB_PORT;
const DATABASE = process.env.DB_NAME;
const USER = process.env.DB_USERNAME;
const PASS = process.env.DB_PASSWORD;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: HOST,
  port: Number(PORT),
  username: USER,
  password: PASS,
  database: DATABASE,
  synchronize: true,
  logging: false,
  entities: [ReplaceableKeyDbEntity, TemplateDbEntity],
  subscribers: [],
  migrations: [],
});

export default async () => {
  await AppDataSource.initialize();
  console.log(`Database connected!`);
};
