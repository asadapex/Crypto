import { VideoCardType } from '@prisma/client';

export const VideoCardInfo: Record<
  VideoCardType,
  { hashRate: number; price: number }
> = {
  [VideoCardType.GTX_1660]: { hashRate: 0.0002, price: 200 },
  [VideoCardType.RTX_3060]: { hashRate: 0.0005, price: 350 },
  [VideoCardType.RTX_3080]: { hashRate: 0.0009, price: 700 },
  [VideoCardType.RTX_4090]: { hashRate: 0.0015, price: 1600 },
};
