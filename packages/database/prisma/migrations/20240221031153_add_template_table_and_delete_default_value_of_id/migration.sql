-- CreateTable
CREATE TABLE "Mail_Template" (
    "mailTemplateId" UUID NOT NULL,
    "actionDivision" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT,

    CONSTRAINT "Mail_Template_pkey" PRIMARY KEY ("mailTemplateId")
);

-- CreateTable
CREATE TABLE "Sms_Template" (
    "smsTemplateId" UUID NOT NULL,
    "actionDivision" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT,

    CONSTRAINT "Sms_Template_pkey" PRIMARY KEY ("smsTemplateId")
);
