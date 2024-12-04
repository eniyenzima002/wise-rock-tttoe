import { Request, Response } from "express";
import Router from "../../decorators/router.decorator";
import AuthControllers from "../controllers/auth.controllers";
import { Get, Post } from "../../decorators/handler.decorator";
import { protectRoute } from "../../middleware/protect.pages";

@Router("/api/v1/auth")
export default class AuthRoutes {
    private authController;

    constructor() {
        this.authController = new AuthControllers();
    }

    // @access - Public
    @Post("/register")
    async register(req: Request, res: Response) {
        return this.authController.registerUser(req, res);
    }

    // @access - Public
    @Post("/login")
    async login(req: Request, res: Response) {
        return this.authController.loginUser(req, res);
    }

    // @access - Public
    @Post("/logout")
    async logout(req: Request, res: Response) {
        return this.authController.logoutUser(req, res);
    }

    // @access Auth - protected
    @Get("/player", [protectRoute])
    async getUser(req: Request, res: Response) {
        return this.authController.playerAuth(req, res);
    }

}