"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomController = void 0;
const socket_controllers_1 = require("socket-controllers");
const socket_io_1 = require("socket.io");
const typedi_1 = require("typedi");
let RoomController = class RoomController {
    async joinGame(io, socket, message) {
        console.log("User room: ", [message]);
        const connectedSockets = io.sockets.adapter.rooms.get(message);
        const socketRoom = Array.from(socket.rooms.values()).filter((room) => room !== socket.id);
        if (socketRoom.length > 0 || (connectedSockets && connectedSockets.size === 2)) {
            socket.emit("room_join_error", {
                error: "Room is full please create one or join another to play in!"
            });
        }
        else {
            await socket.join([message.roomName, message.id]);
            socket.emit("room_joined");
            if (io.sockets.adapter.rooms.get(message.roomName)?.size === 2) {
                socket.emit("start_game", { start: true, symbol: "x" });
                socket.to(message.roomId).emit("start_game", { start: false, symbol: "o" });
            }
        }
    }
};
exports.RoomController = RoomController;
__decorate([
    (0, socket_controllers_1.OnMessage)("join_game"),
    __param(0, (0, socket_controllers_1.SocketIO)()),
    __param(1, (0, socket_controllers_1.ConnectedSocket)()),
    __param(2, (0, socket_controllers_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Server,
        socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "joinGame", null);
exports.RoomController = RoomController = __decorate([
    (0, socket_controllers_1.SocketController)(),
    (0, typedi_1.Service)()
], RoomController);
