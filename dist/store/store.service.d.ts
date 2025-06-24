import { PrismaService } from '../prisma/prisma.service';
import { BuyVideoCardDto } from './dto/buy-video-card.dto';
export declare class StoreService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    buyCard(userId: string, dto: BuyVideoCardDto): Promise<{
        id: string;
        type: import(".prisma/client").$Enums.VideoCardType;
        userId: string;
        createdAt: Date;
    }>;
}
