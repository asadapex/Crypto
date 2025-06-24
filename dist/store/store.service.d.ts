import { PrismaService } from '../prisma/prisma.service';
import { BuyVideoCardDto } from './dto/buy-video-card.dto';
export declare class StoreService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    buyCard(userId: string, dto: BuyVideoCardDto): Promise<{
        type: import(".prisma/client").$Enums.VideoCardType;
        id: string;
        createdAt: Date;
        userId: string;
    }>;
}
