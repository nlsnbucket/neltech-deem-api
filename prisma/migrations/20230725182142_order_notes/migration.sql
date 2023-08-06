-- CreateTable
CREATE TABLE "OrderNotes" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "OrderNotes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderNotes" ADD CONSTRAINT "OrderNotes_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
