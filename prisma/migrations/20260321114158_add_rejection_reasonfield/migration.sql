/*
  Warnings:

  - A unique constraint covering the columns `[plateNumber]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `plateNumber` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParkingAvenue" ADD COLUMN     "rejectionReason" TEXT;

-- AlterTable
ALTER TABLE "ParkingAvenueOwner" ADD COLUMN     "rejectionReason" TEXT;

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "plateNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_plateNumber_key" ON "Reservation"("plateNumber");
