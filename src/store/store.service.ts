import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BuyVideoCardDto } from './dto/buy-video-card.dto';
import { VideoCardType } from '@prisma/client';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}

  async buyCard(userId: string, dto: BuyVideoCardDto) {
    const videoCardExists = Object.values(VideoCardType).includes(dto.type);
    if (!videoCardExists) {
      throw new NotFoundException({ message: 'Video card not found' });
    }

    return this.prisma.userVideoCard.create({
      data: {
        userId,
        type: dto.type,
      },
    });
  }
}
