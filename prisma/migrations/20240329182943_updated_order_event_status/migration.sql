/*
  Warnings:

  - The values [CHANCELED] on the enum `order_events_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [CHANCELED] on the enum `order_events_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `order_events` MODIFY `status` ENUM('PENDING', 'ACCEPTED', 'OUTFORDEILIVEY', 'DELIVERED', 'CANCELLED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `orders` MODIFY `status` ENUM('PENDING', 'ACCEPTED', 'OUTFORDEILIVEY', 'DELIVERED', 'CANCELLED') NOT NULL DEFAULT 'PENDING';
