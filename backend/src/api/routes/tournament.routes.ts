import { Request, Response } from "express";
import Router from "../../decorators/router.decorator";
import TournamentController from "../controllers/tournament.controller";
import { Get, Post } from "../../decorators/handler.decorator";
import { protectRoute } from "../../middleware/protect.pages";

@Router("/api/v1/tournament")
export default class TournamentRoutes {
    private Tournament;

    constructor() {
        this.Tournament = new TournamentController();
    }

    //__INIT-GET__

    // @access Auth - protected - get active player
    @Get("/players", [protectRoute])
    async sidebarPlayers(req: Request, res: Response) {
        return this.Tournament.getSidebarPlayers(req, res);
    }

    // @access Auth - protected - get rooms
    @Get("/room/:id", [protectRoute])
    async playerGame(req: Request, res: Response) {
        return this.Tournament.getPlayerRoom(req, res);
    }
    
    // @access Auth - protected - get game results
    @Get("/result/:id", [protectRoute])
    async getResult(req: Request, res: Response) {
        return this.Tournament.getGameResult(req, res);
    }

    // @access Auth - protected - get game tournament
    @Get("/game/:id", [protectRoute])
    async tournament(req: Request, res: Response) {
        return this.Tournament.getTournament(req, res);
    }


    //__INIT-POST__

    // @access Auth - protected - create a room
    @Post("/:id", [protectRoute])
    async gameRoomName(req: Request, res: Response) {
        return this.Tournament.createGameRoom(req, res);
    }

    // @access Auth - protected - join a room
    @Post("/join/:id", [protectRoute])
    async joinGame(req: Request, res: Response) {
        return this.Tournament.joinGameRoom(req, res);
    }

    // @access Auth - protected - create result
    @Post("/results/:id", [protectRoute])
    async createResult(req: Request, res: Response) {
        return this.Tournament.createGameResult(req, res);
    }
    

}