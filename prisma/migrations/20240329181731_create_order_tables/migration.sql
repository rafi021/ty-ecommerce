-- AlterTable
ALTER TABLE `orders` ADD COLUMN `status` ENUM('PENDING', 'ACCEPTED', 'OUTFORDEILIVEY', 'DELIVERED', 'CHANCELED') NOT NULL DEFAULT 'PENDING';
