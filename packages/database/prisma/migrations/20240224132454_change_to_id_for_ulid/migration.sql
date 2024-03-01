/*
  Warnings:

  - The primary key for the `Follower` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Mail_Notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Mail_Template` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Material` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Post_Like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Post_Material` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Process` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Sms_Notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Sms_Template` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post_Like" DROP CONSTRAINT "Post_Like_postId_fkey";

-- DropForeignKey
ALTER TABLE "Post_Like" DROP CONSTRAINT "Post_Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post_Material" DROP CONSTRAINT "Post_Material_postId_fkey";

-- DropForeignKey
ALTER TABLE "Process" DROP CONSTRAINT "Process_postId_fkey";

-- AlterTable
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_pkey",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Follower_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "Mail_Notification" DROP CONSTRAINT "Mail_Notification_pkey",
ALTER COLUMN "mailNotificationId" SET DATA TYPE TEXT,
ALTER COLUMN "mailTemplateId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Mail_Notification_pkey" PRIMARY KEY ("mailNotificationId");

-- AlterTable
ALTER TABLE "Mail_Template" DROP CONSTRAINT "Mail_Template_pkey",
ALTER COLUMN "mailTemplateId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Mail_Template_pkey" PRIMARY KEY ("mailTemplateId");

-- AlterTable
ALTER TABLE "Material" DROP CONSTRAINT "Material_pkey",
ALTER COLUMN "materialId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Material_pkey" PRIMARY KEY ("materialId");

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
ALTER COLUMN "postId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("postId");

-- AlterTable
ALTER TABLE "Post_Like" DROP CONSTRAINT "Post_Like_pkey",
ALTER COLUMN "postLikeId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "postId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Post_Like_pkey" PRIMARY KEY ("postLikeId");

-- AlterTable
ALTER TABLE "Post_Material" DROP CONSTRAINT "Post_Material_pkey",
ALTER COLUMN "postMaterialId" SET DATA TYPE TEXT,
ALTER COLUMN "postId" SET DATA TYPE TEXT,
ALTER COLUMN "materialId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Post_Material_pkey" PRIMARY KEY ("postMaterialId");

-- AlterTable
ALTER TABLE "Process" DROP CONSTRAINT "Process_pkey",
ALTER COLUMN "uuid" SET DATA TYPE TEXT,
ALTER COLUMN "postId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Process_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "Sms_Notification" DROP CONSTRAINT "Sms_Notification_pkey",
ALTER COLUMN "smsNotificationId" SET DATA TYPE TEXT,
ALTER COLUMN "smsTemplateId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Sms_Notification_pkey" PRIMARY KEY ("smsNotificationId");

-- AlterTable
ALTER TABLE "Sms_Template" DROP CONSTRAINT "Sms_Template_pkey",
ALTER COLUMN "smsTemplateId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Sms_Template_pkey" PRIMARY KEY ("smsTemplateId");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Material" ADD CONSTRAINT "Post_Material_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Process" ADD CONSTRAINT "Process_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Like" ADD CONSTRAINT "Post_Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Like" ADD CONSTRAINT "Post_Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;
