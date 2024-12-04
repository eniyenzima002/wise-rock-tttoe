"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_controllers_1 = require("socket-controllers");
const typedi_1 = require("typedi");
const socket_io_1 = require("socket.io");
exports.default = (socketServer) => {
    const io = new socket_io_1.Server(socketServer, {
        cors: {
            origin: ["http://localhost:3001"],
            methods: ["GET", "POST"],
        }
    });
    new socket_controllers_1.SocketControllers({
        io,
        container: typedi_1.Container,
        controllers: [__dirname + "/events/*.ts"],
    });
    return io;
};
