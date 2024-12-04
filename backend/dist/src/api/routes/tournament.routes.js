"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_decorator_1 = __importDefault(require("../../decorators/router.decorator"));
const tournament_controller_1 = __importDefault(require("../controllers/tournament.controller"));
const handler_decorator_1 = require("../../decorators/handler.decorator");
const protect_pages_1 = require("../../middleware/protect.pages");
let TournamentRoutes = class TournamentRoutes {
    constructor() {
        this.Tournament = new tournament_controller_1.default();
    }
    //__INIT-GET__
    // @access Auth - protected - get active player
    async sidebarPlayers(req, res) {
        return this.Tournament.getSidebarPlayers(req, res);
    }
    // @access Auth - protected - get rooms
    async playerGame(req, res) {
        return this.Tournament.getPlayerRoom(req, res);
    }
    // @access Auth - protected - get game results
    async getResult(req, res) {
        return this.Tournament.getGameResult(req, res);
    }
    // @access Auth - protected - get game tournament
    async tournament(req, res) {
        return this.Tournament.getTournament(req, res);
    }
    //__INIT-POST__
    // @access Auth - protected - create a room
    async gameRoomName(req, res) {
        return this.Tournament.createGameRoom(req, res);
    }
    // @access Auth - protected - join a room
    async joinGame(req, res) {
        return this.Tournament.joinGameRoom(req, res);
    }
    // @access Auth - protected - create result
    async createResult(req, res) {
        return this.Tournament.createGameResult(req, res);
    }
};
__decorate([
    (0, handler_decorator_1.Get)("/players", [protect_pages_1.protectRoute]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TournamentRoutes.prototype, "sidebarPlayers", null);
__decorate([
    (0, handler_decorator_1.Get)("/room/:id", [protect_pages_1.protectRoute]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TournamentRoutes.prototype, "playerGame", null);
__decorate([
    (0, handler_decorator_1.Get)("/result/:id", [protect_pages_1.protectRoute]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TournamentRoutes.prototype, "getResult", null);
__decorate([
    (0, handler_decorator_1.Get)("/game/:id", [protect_pages_1.protectRoute]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TournamentRoutes.prototype, "tournament", null);
__decorate([
    (0, handler_decorator_1.Post)("/:id", [protect_pages_1.protectRoute]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TournamentRoutes.prototype, "gameRoomName", null);
__decorate([
    (0, handler_decorator_1.Post)("/join/:id", [protect_pages_1.protectRoute]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TournamentRoutes.prototype, "joinGame", null);
__decorate([
    (0, handler_decorator_1.Post)("/results/:id", [protect_pages_1.protectRoute]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TournamentRoutes.prototype, "createResult", null);
TournamentRoutes = __decorate([
    (0, router_decorator_1.default)("/api/v1/tournament"),
    __metadata("design:paramtypes", [])
], TournamentRoutes);
exports.default = TournamentRoutes;
