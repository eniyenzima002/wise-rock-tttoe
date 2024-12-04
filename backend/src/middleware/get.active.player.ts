import jwt, { JwtPayload } from "jsonwebtoken"
import prisma from "../db/prisma";

interface DecodedToken extends JwtPayload {
    playerId: string;
}

declare global {
    namespace Express {
        export interface Request {
            player: {
                id: string;
            }
        }
    }
}

const getActivePlayer = async (token: string) => {

        if (!token) {
            return {
                error: "Session out.",
                logout: true
            }
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

        // Find player id in the database
        const player = await prisma.user.findUnique({
            where: {
                id: decoded.playerId
            }, select: {
                id: true,
                username: true,
            }
        });

        return player;
        
}

export default getActivePlayer;
