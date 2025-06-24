import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    findUser(email: string): Promise<{
        email: string;
        password: string;
        id: string;
        btc: number;
        monthlyProfit: number;
        status: import(".prisma/client").$Enums.UserStatus;
        createdAt: Date;
    } | null>;
    create(data: CreateAuthDto): Promise<{
        token: string;
    } | undefined>;
    login(data: CreateAuthDto): Promise<{
        token: string;
    } | undefined>;
    findMe(req: Request): Promise<{
        email: string;
        btc: number;
        monthlyProfit: number;
        cards: {
            type: import(".prisma/client").$Enums.VideoCardType;
            createdAt: Date;
        }[];
    }>;
}
