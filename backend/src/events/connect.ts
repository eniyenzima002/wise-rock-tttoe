import { ConnectedSocket, MessageBody, OnConnect, OnDisconnect, OnMessage, SocketController, SocketIO } from "socket-controllers";
import { Socket, Server } from "socket.io";
import { Service } from "typedi";
import  getActivePlayer  from "../middleware/get.active.player";
import prisma from "../db/prisma";


@SocketController()
@Service()
export class ConnectUser {
    onlinePlayer = new Set();
    player: string | { id: string; username: string; } | { error: string; logout: boolean; } | null | any;

    @OnConnect()
    async onConnection(@ConnectedSocket() socket: Socket,
        @SocketIO() io: Server
    ) {
        console.log("New Socket player connected: ", socket.id);
    }

    @OnDisconnect()
    onDisconnect(@ConnectedSocket() socket: Socket) {
        console.log("Player disconnected: ", socket.id); 
    }
}