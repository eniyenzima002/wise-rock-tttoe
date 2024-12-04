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
        console.log("New Socket player connected: ", socket.id)
        
        // __INIT-PLAYER-TOKEN__
        // const token = socket.handshake.auth.player as any;
        // this.player = await getActivePlayer(token)
        // console.log("Socket connected credentials: ", this.player.id);


        // __ONLINE__
        // socket.join(this.player.id?.toString());
        // this.onlinePlayer.add(this.player?.id.toString());
        // io.emit("get_online_player", Array.from(this.onlinePlayer));

        // __AUTH__
        // socket.on("auth_player", async (authId) => {
        //     console.log("auth id", authId)
        //     const authPlayer = await prisma.user.findUnique({ where: { id: authId } });
            
        //     const authPayload = {
        //         id: authPlayer?.id,
        //         username: authPlayer?.username,
        //         online: this.onlinePlayer.has(authId)
        //     }

        //     io.emit("authenticated_player", authPayload);
        // })
        
    }

    @OnDisconnect()
    onDisconnect(@ConnectedSocket() socket: Socket) {
        // this.onlinePlayer.delete(this.player?.id);
        console.log("Player disconnected: ", socket.id); 
    }
}