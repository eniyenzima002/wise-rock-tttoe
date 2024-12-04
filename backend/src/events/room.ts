import { ConnectedSocket, MessageBody, OnMessage, SocketController, SocketIO } from "socket-controllers";
import { Server, Socket } from "socket.io";
import { Service } from "typedi";

@SocketController()
@Service()
export class RoomController {
    @OnMessage("join_game")
    async joinGame(
        @SocketIO() io: Server,
        @ConnectedSocket() socket: Socket,
        @MessageBody() message: any
    ) {
        console.log("User room: ", [message]);
        
        const connectedSockets = io.sockets.adapter.rooms.get(message);
        const socketRoom = Array.from(socket.rooms.values()).filter((room) => room !== socket.id);

        if (socketRoom.length > 0 || (connectedSockets && connectedSockets.size === 2)

        ) {
            socket.emit("room_join_error", {
                error: "Room is full please create one or join another to play in!"
            });
        } else {
            await socket.join([message.roomName, message.id]);
            socket.emit("room_joined");

            if (io.sockets.adapter.rooms.get(message.roomName)?.size === 2) {
                socket.emit("start_game", { start: true, symbol: "x" });
                socket.to(message.roomId).emit("start_game", { start: false, symbol: "o" });
            }
        }
    }
    
}