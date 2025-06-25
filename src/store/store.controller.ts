import { Post, Body, UseGuards, Controller, Req, Get } from '@nestjs/common';
import { StoreService } from './store.service';
import { BuyVideoCardDto } from './dto/buy-video-card.dto';
import { AuthGuard } from 'src/jwtauth/jwtauth.guard';
import { Request } from 'express';
import { ApiBody } from '@nestjs/swagger';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @UseGuards(AuthGuard)
  @Post('buy')
  @ApiBody({ type: [BuyVideoCardDto] })
  async buy(@Req() req: Request, @Body() dtos: BuyVideoCardDto[]) {
    const userId = req['user-id'];
    return this.storeService.buyCards(userId, dtos);
  }

  @Get('cards')
  async getCards() {
    return this.storeService.getAllVideoCards();
  }
}
