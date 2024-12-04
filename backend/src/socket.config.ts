import { SocketControllers } from "socket-controllers";
import { Container } from "typedi";
import { Server } from "socket.io";

export default (socketServer: any): Server => {
    const io = new Server(socketServer, {
        cors: {
            origin: ["http://localhost:3001"],
            methods: ["GET", "POST"],
        }
    });

    new SocketControllers({
        io,
        container: Container,
        controllers: [__dirname + "/events/*.ts"],
    })
    
    return io;
}