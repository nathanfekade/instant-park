-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "PARKINGSTATUS" AS ENUM ('OPEN', 'CLOSED', 'MAINTENANCE');

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLogin" TIMESTAMP(3),

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkingAvenue" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "ownerId" TEXT NOT NULL,
    "workingHrs" TEXT NOT NULL,
    "totalSpots" INTEGER NOT NULL,
    "status" "PARKINGSTATUS" NOT NULL,
    "currentSpots" INTEGER NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ParkingAvenue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLogin" TIMESTAMP(3),

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkingAvenueOwner" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLogin" TIMESTAMP(3),
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ParkingAvenueOwner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_username_key" ON "Customer"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phoneNo_key" ON "Customer"("phoneNo");

-- CreateIndex
CREATE UNIQUE INDEX "ParkingAvenue_name_key" ON "ParkingAvenue"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ParkingAvenue_address_key" ON "ParkingAvenue"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "ParkingAvenueOwner_username_key" ON "ParkingAvenueOwner"("username");

-- CreateIndex
CREATE UNIQUE INDEX "ParkingAvenueOwner_phoneNo_key" ON "ParkingAvenueOwner"("phoneNo");

-- CreateIndex
CREATE UNIQUE INDEX "ParkingAvenueOwner_email_key" ON "ParkingAvenueOwner"("email");

-- AddForeignKey
ALTER TABLE "ParkingAvenue" ADD CONSTRAINT "ParkingAvenue_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "ParkingAvenueOwner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
