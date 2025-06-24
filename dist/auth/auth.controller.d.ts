import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createAuthDto: CreateAuthDto): Promise<{
        token: string;
    } | undefined>;
    login(createAuthDto: CreateAuthDto): Promise<{
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
