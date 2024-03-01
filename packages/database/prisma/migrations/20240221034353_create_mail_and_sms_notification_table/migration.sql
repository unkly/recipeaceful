/*
  Warnings:

  - Added the required column `createdBy` to the `Mail_Template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mail_Template" ADD COLUMN     "createdBy" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Mail_Notification" (
    "mailNotificationId" UUID NOT NULL,
    "mailTemplateId" UUID NOT NULL,
    "actionDivision" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT,

    CONSTRAINT "Mail_Notification_pkey" PRIMARY KEY ("mailNotificationId")
);

-- CreateTable
CREATE TABLE "Sms_Notification" (
    "smsNotificationId" UUID NOT NULL,
    "smsTemplateId" UUID NOT NULL,
    "actionDivision" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT,

    CONSTRAINT "Sms_Notification_pkey" PRIMARY KEY ("smsNotificationId")
);
