import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { VideoCardInfo } from 'src/VideoCards/VideoCardInfo';
import { VideoCardType } from '@prisma/client';

@Injectable()
export class MiningService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron('0 0 1 * *')
  async resetMonthlyProfit() {
    const users = await this.prisma.user.findMany();

    for (const user of users) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          monthlyProfit: 0,
        },
      });
    }
  }

  @Cron('0 0 * * *')
  async handleMining() {
    const users = await this.prisma.user.findMany({
      include: {
        cards: true,
      },
    });

    for (const user of users) {
      let totalProfit = 0;

      for (const card of user.cards) {
        const info = VideoCardInfo[card.type as VideoCardType];
        if (info) {
          totalProfit += info.hashRate * 24;
        }
      }

      if (totalProfit > 0) {
        await this.prisma.user.update({
          where: { id: user.id },
          data: {
            btc: { increment: totalProfit },
            monthlyProfit: { increment: totalProfit },
          },
        });
      }
    }
  }
}
