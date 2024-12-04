"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectRoute = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../db/prisma"));
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No token provided." });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token." });
        }
        // Find user in the database
        const user = await prisma_1.default.user.findUnique({
            where: {
                id: decoded.userId
            }, select: {
                id: true,
                username: true,
            }
        });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log("Error from login controller", error.message);
        res.status(500).json({ error: "Internal Server Error." });
    }
};
exports.protectRoute = protectRoute;
