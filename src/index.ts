import express, { Request, Response } from 'express';
import prisma from "./providers/prisma.provider";
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import passport from './config/passport.config';
const cors = require("cors");

import 'dotenv/config';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(passport.initialize());

const startApp = async () => {
  try {
    await prisma.$runCommandRaw({ ping: 1 });
    console.log("Conexión a la base de datos exitosa.");

    app.use(express.json());
    app.use(cors());
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.use("/users", userRoutes);
    app.use("/auth", authRoutes);

    app.listen(PORT, () => {
      console.log(`El servidor está escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error conectando a la base de datos:", error);
  }
};

startApp();