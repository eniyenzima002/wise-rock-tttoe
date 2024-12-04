import DefaultEventsMap, { io, Socket } from "socket.io-client";

class SocketService {
    socket: Socket | null = null;
    
    connect(url: string): Promise<Socket<typeof DefaultEventsMap, typeof DefaultEventsMap>> {
        
        return new Promise((rs, rj) => {
            this.socket = io(url, {transports: ['websocket'],});

            if (!this.socket) return rj();

            this.socket.on("connect", () => {
                rs(this.socket as Socket);
            });

            this.socket.on("connect_error", (err) => {
                console.log("Connection error: ", err);
                rj(err)
            });

        });
    }
}

export default new SocketService();