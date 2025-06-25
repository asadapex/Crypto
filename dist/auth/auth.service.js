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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const otplib_1 = require("otplib");
const mailer_service_1 = require("../mailer/mailer.service");
const client_1 = require("@prisma/client");
const jwt_1 = require("@nestjs/jwt");
otplib_1.totp.options = {
    step: 120,
    digits: 5,
};
let AuthService = class AuthService {
    prisma;
    mailService;
    jwt;
    constructor(prisma, mailService, jwt) {
        this.prisma = prisma;
        this.mailService = mailService;
        this.jwt = jwt;
    }
    async findUser(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        return user;
    }
    async create(data) {
        const user = await this.findUser(data.email);
        if (user) {
            throw new common_1.BadRequestException({ message: 'User already exists' });
        }
        try {
            const hash = bcrypt.hashSync(data.password, 10);
            const user = await this.prisma.user.create({
                data: { ...data, password: hash, status: client_1.UserStatus.ACTIVE },
            });
            const token = this.jwt.sign({ id: user.id });
            return { token };
        }
        catch (error) {
            if (error != common_1.InternalServerErrorException) {
                throw error;
            }
            console.log(error);
        }
    }
    async login(data) {
        const user = await this.findUser(data.email);
        if (!user) {
            throw new common_1.NotFoundException({ message: 'User not found' });
        }
        try {
            const match = bcrypt.compareSync(data.password, user.password);
            if (!match) {
                throw new common_1.BadRequestException({ message: 'Wrong credentials' });
            }
            if (user.status === client_1.UserStatus.PENDING) {
                throw new common_1.BadRequestException({ message: 'User has not verified' });
            }
            const token = this.jwt.sign({ id: user.id });
            return { token };
        }
        catch (error) {
            if (error != common_1.InternalServerErrorException) {
                throw error;
            }
            console.log(error);
        }
    }
    async findMe(req) {
        const user = await this.prisma.user.findUnique({
            where: { id: req['user-id'] },
            include: {
                cards: true,
            },
        });
        if (!user)
            throw new common_1.NotFoundException({ message: 'User not found' });
        return {
            email: user.email,
            btc: user.btc,
            monthlyProfit: user.monthlyProfit,
            cards: user.cards.map((card) => ({
                type: card.type,
                createdAt: card.createdAt,
            })),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mailer_service_1.MailerService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map