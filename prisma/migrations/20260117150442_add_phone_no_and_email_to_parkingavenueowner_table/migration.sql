/*
  Warnings:

  - A unique constraint covering the columns `[phoneNo]` on the table `ParkingAvenueOwner` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `ParkingAvenueOwner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `ParkingAvenueOwner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNo` to the `ParkingAvenueOwner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParkingAvenueOwner" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phoneNo" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ParkingAvenueOwner_phoneNo_key" ON "ParkingAvenueOwner"("phoneNo");

-- CreateIndex
CREATE UNIQUE INDEX "ParkingAvenueOwner_email_key" ON "ParkingAvenueOwner"("email");
