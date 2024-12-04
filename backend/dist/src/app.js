"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const definition_1 = __importDefault(require("./app/definition"));
const logger_1 = __importDefault(require("./library/logger"));
require("reflect-metadata");
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./api/routes/auth.routes"));
const socket_config_1 = __importDefault(require("./socket.config"));
const tournament_routes_1 = __importDefault(require("./api/routes/tournament.routes"));
const path_1 = __importDefault(require("path"));
// Load the envs based on current NODE_ENV
dotenv_1.default.config({ path: `${process.cwd()}/.env` });
// dotenv.config({ path: `${process.cwd()}/.env.${process.env.NODE_ENV}` });
const PORT = process.env.PORT || 4001;
const app = new definition_1.default(PORT, [
    (0, cors_1.default)(),
    (0, cookie_parser_1.default)(),
    express_1.default.json({ limit: '10kb' }),
    express_1.default.urlencoded({ extended: true, limit: '10kb' }),
    express_1.default.static(path_1.default.join(__dirname, "/frontend/dist"))
], [auth_routes_1.default, tournament_routes_1.default]);
const server = app.startServer();
(0, socket_config_1.default)(server);
// Handle SIGTERM
process.on('SIGTERM', () => {
    logger_1.default.warn('SIGTERM RECEIVED.');
    server.close(() => {
        logger_1.default.warn('Process Terminated.');
    });
});
