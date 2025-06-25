import { PrismaService } from '../prisma/prisma.service';
import { BuyVideoCardDto } from './dto/buy-video-card.dto';
export declare class StoreService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    buyCards(userId: string, dtos: BuyVideoCardDto[]): Promise<{
        message: string;
    }>;
    getAllVideoCards(): Promise<{
        hashRate: number;
        price: number;
        type: string;
    }[]>;
}
