/*
  Warnings:

  - Added the required column `status` to the `Mail_Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Sms_Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mail_Notification" ADD COLUMN     "status" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Sms_Notification" ADD COLUMN     "status" INTEGER NOT NULL;
