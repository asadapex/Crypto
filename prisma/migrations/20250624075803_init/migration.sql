/*
  Warnings:

  - You are about to drop the `UserVideoCard` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "VideoCardType" AS ENUM ('GTX_1660', 'RTX_3060', 'RTX_3080', 'RTX_4090');

-- DropForeignKey
ALTER TABLE "UserVideoCard" DROP CONSTRAINT "UserVideoCard_userId_fkey";

-- DropTable
DROP TABLE "UserVideoCard";

-- CreateTable
CREATE TABLE "VideoCard" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hashRate" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "type" "VideoCardType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VideoCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VideoCard" ADD CONSTRAINT "VideoCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
