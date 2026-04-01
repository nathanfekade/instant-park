/*
  Warnings:

  - A unique constraint covering the columns `[reservationId]` on the table `CheckIn` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[checkoutTxRef]` on the table `CheckIn` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CheckIn" ADD COLUMN     "calculatedAmount" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "checkoutTxRef" TEXT,
ADD COLUMN     "reservationId" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ACTIVE';

-- CreateIndex
CREATE UNIQUE INDEX "CheckIn_reservationId_key" ON "CheckIn"("reservationId");

-- CreateIndex
CREATE UNIQUE INDEX "CheckIn_checkoutTxRef_key" ON "CheckIn"("checkoutTxRef");

-- AddForeignKey
ALTER TABLE "CheckIn" ADD CONSTRAINT "CheckIn_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
