import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { ResendOtpAuthDto } from './dto/resend-otp';
import { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createAuthDto: CreateAuthDto): Promise<{
        message: string;
    } | undefined>;
    verify(data: VerifyAuthDto): Promise<{
        message: string;
    } | undefined>;
    resendOtp(data: ResendOtpAuthDto): Promise<{
        message: string;
    }>;
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
