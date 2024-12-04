import { Request, Response } from "express";
import prisma from "../../db/prisma";
import logger from "../../library/logger";

export default class TournamentController {

    //*********************************/
    // @desc       Create game room
    // @route      POST - /api/v1/tournament/create/:id
    // @access     Private - auth - protected
    async createGameRoom(req: Request, res: Response) {
        try {

            // get player room
            const { roomName } = req.body;
            // get player id
            const playerId = req.user.id;
                
            if (!roomName) {
                return res.status(400).json({ error: "Please fill in the prompt." });
            }
            
            const isRoomExist = await prisma.room.findFirst({
                where: {
                    name: roomName
                }
            })
            
            if (isRoomExist) {
                return res.status(400).json({ error: "Room name already taken." });
            }

            const limitRoom = await prisma.room.count({
                where: { playerId: playerId }
            })
            
            if (limitRoom >= 3) {
                return res.status(400).json({ error: "Can't create more than 3 rooms." });
            }
            
            const playerRoom  = await prisma.room.create({
                data: {
                    playerId,
                    name: roomName,
                }
            });
            
            res.status(201).json({ playerRoom });
    
        } catch (error: any) {
            logger.info("Error from create game room controller", error.message);
            return res.status(500).json({ error: "Internal Server Error." });
        }
    }

    //*********************************/
    // @desc       Join game room
    // @route      POST - /api/v1/tournament/join/:id
    // @access     Private - auth - protected
    async joinGameRoom(req: Request, res: Response) {
        try {

            // get room name to join
            const { roomName } = req.body;
            // get room creator id
            const { id: roomCreatorId } = req.params;
            // get joining player id
            const playerId = req.user.id;
                
            if (!roomName) {
                return res.status(400).json({ error: "Please select a room name." });
            }
            
            const playerRoom = await prisma.room.findFirst({
                where: {
                    name: roomName
                }
            })

            if (playerRoom?.name !== roomName) {
                return res.status(400).json({ error: "No associated room found." });
            }

            if (playerRoom?.playerId !== roomCreatorId) {
                return res.status(401).json({ error: "That room doesn't belong to this player." });
            }
            
            let tournament = await prisma.tournament.findFirst({
                where: {
                    participantIds: {
                        hasEvery: [playerId, roomCreatorId]
                    }
                }
            });
            
            if (tournament) {
                return res.status(401).json({ error: "Room is full! Game in progress." });
            }

            if (!tournament) {
                tournament = await prisma.tournament.create({
                    data: {
                        participantIds: {
                            set: [playerId, roomCreatorId]
                        },
                        roomInfo: [playerRoom.id, playerRoom.name]
                    }
                });

            }
           

            res.status(201).json({ tournament });
    
        } catch (error: any) {
            logger.info("Error from join a game room controller ", error.message);
            return res.status(500).json({ error: "Internal Server Error." });
        }
    }

    //*********************************/
    // @desc       Create game result
    // @route      POST - /api/v1/tournament/in-result/:id
    // @access     Private - auth - protected
    async createGameResult(req: Request, res: Response) {
        try {

            // get game result
            const { resultMsg } = req.body;
            // get player url id
            const { id: playerResultId } = req.params;
                
            if (!resultMsg) {
                return res.status(400).json({ error: "No result provided." });
            }

            const results = await prisma.result.create({
                data: {
                    playerId: playerResultId,
                    resultMsg
                },
                
            });
            
            res.status(201).json({ results });
    
        } catch (error: any) {
            logger.info("Error from game result controller", error.message);
            return res.status(500).json({ error: "Internal Server Error." });
        }
    }

    //*********************************/
    // @desc       Get game result
    // @route      GET - /api/v1/tournament/result/:id
    // @access     Private - auth - protected
    async getGameResult(req: Request, res: Response) {
        try {

            const {id: playerId} = req.params;
            // const playerId = req.user.id;
    
            const result = await prisma.result.findMany({
                where: {
                    playerId
                },
                select: {
                    id: true,
                    playerId: true,
                    resultMsg: true,
                },
            });
    
            if (!result) {
                return res.status(200).json([]);
            }
    
            res.status(200).json(result);

        } catch (error: any) {
            console.error("Error in get result controller: ", error.message);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    //*********************************/
    // @desc       Get game result
    // @route      GET - /api/v1/tournament/result/:id
    // @access     Private - auth - protected
    async getTournament(req: Request, res: Response) {
        try {

            const {id: playerId} = req.params;
            // const playerId = req.user.id;
    
            const tournament = await prisma.tournament.findMany({
                where: {
                    participantIds: {
                         has: playerId
                    }
                },
                select: {
                    id: true,
                    roomInfo: true,
                    participantIds: true,
                    createdAt: true
                },
            });
    
            if (!tournament) {
                return res.status(200).json([]);
            }
    
            res.status(200).json(tournament);

        } catch (error: any) {
            console.error("Error in get result controller: ", error.message);
            res.status(500).json({ error: "Internal server error" });
        }
    };

/*
    async getPlayerRoom(req: Request, res: Response) {
        try {
            const { id: userToPlayerId } = req.params;
            const playerId = req.user.id;
    
            const tournament = await prisma.tournament.findFirst({
                where: {
                    participantIds: {
                        hasEvery: [playerId, userToPlayerId]
                    }
                },
                select: {
                    roomInfo: []
                    }
                }
            });
    
            if (!tournament) {
                return res.status(200).json([])
            }
    
            res.status(200).json(tournament.rooms);
    
        } catch (error: any) {
            logger.info("Error from getPlayerOutcome controller", error.message);
            return res.status(500).json({ error: "Internal Server Error." });
        }
    }
*/
    
    //*********************************/
    // @desc       Get player room
    // @route      GET - /api/v1/tournament/room/:id
    // @access     Private - auth - protected
    async getPlayerRoom(req: Request, res: Response) {
        try {
            const playerRoomId = req.user.id
    
            const room = await prisma.room.findMany({
                where: {
                    playerId: {
                        not: playerRoomId
                    }
                }, select: {
                    id: true,
                    playerId: true,
                    name: true
                }
            });
    
            res.status(200).json(room);
    
        } catch (error: any) {
            logger.info("Error from get player room controller", error.message);
            return res.status(500).json({ error: "Internal Server Error." });
        }
    }

    //*********************************/
    // @desc       Get active player
    // @route      GET - /api/v1/tournament/players
    // @access     Private - auth - protected
    async getSidebarPlayers(req: Request, res: Response) {
        try {
            const authUserId = req.user.id
    
            const users = await prisma.user.findMany({
                where: {
                    id: {
                        not: authUserId
                    }
                }, select: {
                    id: true,
                    username: true
                }
            });
    
            res.status(200).json(users);
    
        } catch (error: any) {
            logger.info("Error from getSidebarPlayers controller", error.message);
            return res.status(500).json({ error: "Internal Server Error." });
        }
    }

}
