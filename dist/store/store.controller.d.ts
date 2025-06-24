import { StoreService } from './store.service';
import { BuyVideoCardDto } from './dto/buy-video-card.dto';
import { Request } from 'express';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    buy(req: Request, dto: BuyVideoCardDto): Promise<{
        type: import(".prisma/client").$Enums.VideoCardType;
        id: string;
        createdAt: Date;
        userId: string;
    }>;
    getAll(): {
        hashRate: number;
        price: number;
        type: string;
    }[];
}
