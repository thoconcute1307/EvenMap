-- AlterEnum
ALTER TYPE "VerificationCodeType" ADD VALUE 'EMAIL_CHANGE';

-- AlterTable
ALTER TABLE "VerificationCode" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE INDEX "VerificationCode_userId_type_idx" ON "VerificationCode"("userId", "type");
