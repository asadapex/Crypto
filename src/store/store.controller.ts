import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { StoreService } from './store.service';
import { BuyVideoCardDto } from './dto/buy-video-card.dto';
import { AuthGuard } from 'src/jwtauth/jwtauth.guard';
import { VideoCardInfo } from 'src/VideoCards/VideoCardInfo';
import { Request } from 'express';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @UseGuards(AuthGuard)
  @Post('buy')
  async buy(@Req() req: Request, @Body() dto: BuyVideoCardDto) {
    const userId = req['user-id'];
    return this.storeService.buyCard(userId, dto);
  }

  @Get('vide-cards')
  getAll() {
    return Object.entries(VideoCardInfo).map(([type, info]) => ({
      type,
      ...info,
    }));
  }
}
