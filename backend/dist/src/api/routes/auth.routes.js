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
const auth_controllers_1 = __importDefault(require("../controllers/auth.controllers"));
const handler_decorator_1 = require("../../decorators/handler.decorator");
const protect_pages_1 = require("../../middleware/protect.pages");
let AuthRoutes = class AuthRoutes {
    constructor() {
        this.authController = new auth_controllers_1.default();
    }
    // @access - Public
    async register(req, res) {
        return this.authController.registerUser(req, res);
    }
    // @access - Public
    async login(req, res) {
        return this.authController.loginUser(req, res);
    }
    // @access - Public
    async logout(req, res) {
        return this.authController.logoutUser(req, res);
    }
    // @access Auth - protected
    async getUser(req, res) {
        return this.authController.playerAuth(req, res);
    }
};
__decorate([
    (0, handler_decorator_1.Post)("/register"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthRoutes.prototype, "register", null);
__decorate([
    (0, handler_decorator_1.Post)("/login"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthRoutes.prototype, "login", null);
__decorate([
    (0, handler_decorator_1.Post)("/logout"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthRoutes.prototype, "logout", null);
__decorate([
    (0, handler_decorator_1.Get)("/player", [protect_pages_1.protectRoute]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthRoutes.prototype, "getUser", null);
AuthRoutes = __decorate([
    (0, router_decorator_1.default)("/api/v1/auth"),
    __metadata("design:paramtypes", [])
], AuthRoutes);
exports.default = AuthRoutes;
