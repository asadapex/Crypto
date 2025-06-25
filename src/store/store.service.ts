import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BuyVideoCardDto } from './dto/buy-video-card.dto';
import { VideoCardType } from '@prisma/client';
import { VideoCardInfo } from 'src/VideoCards/VideoCardInfo';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}

  async buyCards(userId: string, dtos: BuyVideoCardDto[]) {
    for (const dto of dtos) {
      const videoCardExists = Object.values(VideoCardType).includes(dto.type);
      if (!videoCardExists) {
        throw new NotFoundException(`Video card not found: ${dto.type}`);
      }

      const createManyData = Array.from({ length: dto.count }).map(() => ({
        userId,
        type: dto.type,
      }));

      await this.prisma.userVideoCard.createMany({
        data: createManyData,
      });
    }

    return { message: 'Video cards added' };
  }

  async getAllVideoCards() {
    return Object.entries(VideoCardInfo).map(([type, info]) => ({
      type,
      ...info,
    }));
  }
}
