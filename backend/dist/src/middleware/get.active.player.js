"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../db/prisma"));
const getActivePlayer = async (token) => {
    if (!token) {
        return {
            error: "Session out.",
            logout: true
        };
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    // Find player id in the database
    const player = await prisma_1.default.user.findUnique({
        where: {
            id: decoded.playerId
        }, select: {
            id: true,
            username: true,
        }
    });
    return player;
};
exports.default = getActivePlayer;
