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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiningService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../prisma/prisma.service");
const VideoCardInfo_1 = require("../VideoCards/VideoCardInfo");
let MiningService = class MiningService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async resetMonthlyProfit() {
        const users = await this.prisma.user.findMany();
        for (const user of users) {
            await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    monthlyProfit: 0,
                },
            });
        }
    }
    async handleMining() {
        const users = await this.prisma.user.findMany({
            include: {
                cards: true,
            },
        });
        for (const user of users) {
            let totalProfit = 0;
            for (const card of user.cards) {
                const info = VideoCardInfo_1.VideoCardInfo[card.type];
                if (info) {
                    totalProfit += info.hashRate * 24;
                }
            }
            if (totalProfit > 0) {
                await this.prisma.user.update({
                    where: { id: user.id },
                    data: {
                        btc: { increment: totalProfit },
                        monthlyProfit: { increment: totalProfit },
                    },
                });
            }
        }
    }
};
exports.MiningService = MiningService;
__decorate([
    (0, schedule_1.Cron)('0 0 1 * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MiningService.prototype, "resetMonthlyProfit", null);
__decorate([
    (0, schedule_1.Cron)('0 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MiningService.prototype, "handleMining", null);
exports.MiningService = MiningService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MiningService);
//# sourceMappingURL=mining.service.js.map