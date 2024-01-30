-- CreateTable
CREATE TABLE "User" (
    "uuid" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT,
    "revokedAt" TIMESTAMP(3) NOT NULL,
    "revokedBy" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Post" (
    "uuid" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "calorie" INTEGER,
    "difficulty" INTEGER,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Post_Material" (
    "uuid" UUID NOT NULL,
    "postId" UUID NOT NULL,
    "materialId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Post_Material_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Material" (
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Process" (
    "uuid" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "image" TEXT,
    "postId" UUID NOT NULL,

    CONSTRAINT "Process_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Post_Heart" (
    "uuid" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "postId" UUID NOT NULL,

    CONSTRAINT "Post_Heart_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Post_Material" ADD CONSTRAINT "Post_Material_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Process" ADD CONSTRAINT "Process_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Heart" ADD CONSTRAINT "Post_Heart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Heart" ADD CONSTRAINT "Post_Heart_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
