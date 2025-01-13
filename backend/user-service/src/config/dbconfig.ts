import {Pool} from "pg";
import {Sequelize} from "sequelize";
import util from "util";
import dotenv from "dotenv";

dotenv.config();

interface DbOptions {
  user: string;
  host: string;
  port: number;
  password: string;
  database: string;
  ssl: boolean | object; // Updated to allow boolean or object
}

function configuration() {
  let dbOptions: DbOptions = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DATABASE}`,
    ssl: false, // Set to false if your server does not support SSL
  };

  const pool = new Pool(dbOptions);

  return {
    query(sql: string, values?: any[]) {
      return pool.query(sql, values);
    },
    async close() {
      await pool.end();
    },
  };
}

const sequelize = new Sequelize({
  database: process.env.DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  schema: process.env.DB_SCHEMA,
  dialect: "postgres",
  dialectOptions: {
    ssl: false, // Set to false if your server does not support SSL
  },
});

const authenticateConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export {configuration, authenticateConnection, sequelize};
