-- CreateTable
CREATE TABLE "bank_cards" (
    "id" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "expiryDate" TEXT NOT NULL,
    "cvv" TEXT NOT NULL,

    CONSTRAINT "bank_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_bank_cards" (
    "accountId" TEXT NOT NULL,
    "bankCardId" TEXT NOT NULL,

    CONSTRAINT "account_bank_cards_pkey" PRIMARY KEY ("accountId","bankCardId")
);

-- CreateIndex
CREATE UNIQUE INDEX "bank_cards_cardNumber_key" ON "bank_cards"("cardNumber");

-- AddForeignKey
ALTER TABLE "account_bank_cards" ADD CONSTRAINT "account_bank_cards_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_bank_cards" ADD CONSTRAINT "account_bank_cards_bankCardId_fkey" FOREIGN KEY ("bankCardId") REFERENCES "bank_cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
