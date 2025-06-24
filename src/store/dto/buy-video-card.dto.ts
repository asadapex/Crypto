import { ApiProperty } from '@nestjs/swagger';
import { VideoCardType } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class BuyVideoCardDto {
  @ApiProperty({ enum: VideoCardType, example: VideoCardType.GTX_1660 })
  @IsEnum(VideoCardType)
  type: VideoCardType;
}
