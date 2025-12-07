/*
  Warnings:

  - You are about to drop the column `shippingComplment` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "shippingComplment",
ADD COLUMN     "shippingComplement" TEXT;
