import express from 'express';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import ExpressApplication from './app/definition';
import logger from './library/logger';
import 'reflect-metadata';
import cors from 'cors';
import AuthRoutes from './api/routes/auth.routes';
import socketServer from './socket.config';
import TournamentRoutes from './api/routes/tournament.routes';
import path from 'path';

// Load the envs based on current NODE_ENV
dotenv.config({ path: `${process.cwd()}/.env` });
// dotenv.config({ path: `${process.cwd()}/.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT || 4001;

const app = new ExpressApplication(
  PORT,
  [
    cors(),
    cookieParser(),
    express.json({ limit: '10kb' }),
    express.urlencoded({ extended: true, limit: '10kb' }),
    express.static(path.join(process.cwd(), "/frontend/dist"))
  ],
  [AuthRoutes, TournamentRoutes]
);

const server = app.startServer();
socketServer(server);

// Handle SIGTERM
process.on('SIGTERM', () => {
  logger.warn('SIGTERM RECEIVED.');
  server.close(() => {
    logger.warn('Process Terminated.');
  });
});
