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
exports.StoreService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const VideoCardInfo_1 = require("../VideoCards/VideoCardInfo");
let StoreService = class StoreService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async buyCards(userId, dtos) {
        for (const dto of dtos) {
            const videoCardExists = Object.values(client_1.VideoCardType).includes(dto.type);
            if (!videoCardExists) {
                throw new common_1.NotFoundException(`Video card not found: ${dto.type}`);
            }
            const createManyData = Array.from({ length: dto.count }).map(() => ({
                userId,
                type: dto.type,
            }));
            await this.prisma.userVideoCard.createMany({
                data: createManyData,
            });
        }
        return { message: 'Video cards added' };
    }
    async getAllVideoCards() {
        return Object.entries(VideoCardInfo_1.VideoCardInfo).map(([type, info]) => ({
            type,
            ...info,
        }));
    }
};
exports.StoreService = StoreService;
exports.StoreService = StoreService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StoreService);
//# sourceMappingURL=store.service.js.map