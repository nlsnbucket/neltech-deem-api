-- CreateTable
CREATE TABLE "Access" (
    "id" SERIAL NOT NULL,
    "user_agent" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "last_access" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "disconnected_at" TIMESTAMP,

    CONSTRAINT "Access_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Access" ADD CONSTRAINT "Access_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
