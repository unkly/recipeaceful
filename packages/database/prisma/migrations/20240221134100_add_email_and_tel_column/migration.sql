/*
  Warnings:

  - Added the required column `email` to the `Mail_Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tel` to the `Sms_Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mail_Notification" ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sms_Notification" ADD COLUMN     "tel" TEXT NOT NULL;
