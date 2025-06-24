/*
  Warnings:

  - You are about to drop the `VideoCard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VideoCard" DROP CONSTRAINT "VideoCard_userId_fkey";

-- DropTable
DROP TABLE "VideoCard";

-- CreateTable
CREATE TABLE "UserVideoCard" (
    "id" TEXT NOT NULL,
    "type" "VideoCardType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserVideoCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserVideoCard" ADD CONSTRAINT "UserVideoCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
