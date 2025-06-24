import { PrismaService } from '../prisma/prisma.service';
export declare class MiningService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    resetMonthlyProfit(): Promise<void>;
    handleMining(): Promise<void>;
}
