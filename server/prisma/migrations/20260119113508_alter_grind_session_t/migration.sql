-- AlterTable
ALTER TABLE "GrindSession" ADD COLUMN     "accumulatedTime" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastPausedAt" TIMESTAMP(3);
