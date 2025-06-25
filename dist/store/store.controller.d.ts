import { StoreService } from './store.service';
import { BuyVideoCardDto } from './dto/buy-video-card.dto';
import { Request } from 'express';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    buy(req: Request, dtos: BuyVideoCardDto[]): Promise<{
        message: string;
    }>;
    getCards(): Promise<{
        hashRate: number;
        price: number;
        type: string;
    }[]>;
}
