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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreController = void 0;
const common_1 = require("@nestjs/common");
const store_service_1 = require("./store.service");
const buy_video_card_dto_1 = require("./dto/buy-video-card.dto");
const jwtauth_guard_1 = require("../jwtauth/jwtauth.guard");
const VideoCardInfo_1 = require("../VideoCards/VideoCardInfo");
let StoreController = class StoreController {
    storeService;
    constructor(storeService) {
        this.storeService = storeService;
    }
    async buy(req, dto) {
        const userId = req['user-id'];
        return this.storeService.buyCard(userId, dto);
    }
    getAll() {
        return Object.entries(VideoCardInfo_1.VideoCardInfo).map(([type, info]) => ({
            type,
            ...info,
        }));
    }
};
exports.StoreController = StoreController;
__decorate([
    (0, common_1.UseGuards)(jwtauth_guard_1.AuthGuard),
    (0, common_1.Post)('buy'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, buy_video_card_dto_1.BuyVideoCardDto]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "buy", null);
__decorate([
    (0, common_1.Get)('vide-cards'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StoreController.prototype, "getAll", null);
exports.StoreController = StoreController = __decorate([
    (0, common_1.Controller)('store'),
    __metadata("design:paramtypes", [store_service_1.StoreService])
], StoreController);
//# sourceMappingURL=store.controller.js.map