import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { MailerService } from 'src/mailer/mailer.service';
import { JwtService } from '@nestjs/jwt';
import { ResendOtpAuthDto } from './dto/resend-otp';
import { Request } from 'express';
export declare class AuthService {
    private readonly prisma;
    private readonly mailService;
    private readonly jwt;
    constructor(prisma: PrismaService, mailService: MailerService, jwt: JwtService);
    findUser(email: string): Promise<{
        email: string;
        password: string;
        id: string;
        btc: number;
        monthlyProfit: number;
        status: import(".prisma/client").$Enums.UserStatus;
        createdAt: Date;
    } | null>;
    generateOtpHtml(code: string): string;
    create(data: CreateAuthDto): Promise<{
        message: string;
    } | undefined>;
    verify(data: VerifyAuthDto): Promise<{
        message: string;
    } | undefined>;
    resendOtp(dto: ResendOtpAuthDto): Promise<{
        message: string;
    }>;
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
