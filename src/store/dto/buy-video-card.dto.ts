import { ApiProperty } from '@nestjs/swagger';
import { VideoCardType } from '@prisma/client';
import { IsEnum, IsInt, Min } from 'class-validator';

export class BuyVideoCardDto {
  @ApiProperty({ enum: VideoCardType, example: VideoCardType.GTX_1660 })
  @IsEnum(VideoCardType)
  type: VideoCardType;

  @ApiProperty({ type: Number, example: 1 })
  @IsInt()
  @Min(1)
  count: number;
}
