/*
  Warnings:

  - Changed the type of `actionDivision` on the `Mail_Template` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `actionDivision` on the `Sms_Template` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Mail_Template" DROP COLUMN "actionDivision",
ADD COLUMN     "actionDivision" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Sms_Template" DROP COLUMN "actionDivision",
ADD COLUMN     "actionDivision" INTEGER NOT NULL;
