import { StoreService } from './store.service';
import { BuyVideoCardDto } from './dto/buy-video-card.dto';
import { Request } from 'express';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    buy(req: Request, dto: BuyVideoCardDto): Promise<{
        id: string;
        type: import(".prisma/client").$Enums.VideoCardType;
        userId: string;
        createdAt: Date;
    }>;
    getAll(): {
        hashRate: number;
        price: number;
        type: string;
    }[];
}
