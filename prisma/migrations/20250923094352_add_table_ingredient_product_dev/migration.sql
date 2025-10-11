-- CreateTable
CREATE TABLE "public"."ProductSkinMatch" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "skinType" "public"."SkinType" NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ProductSkinMatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."IngredientSkinMatch" (
    "id" SERIAL NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "skinType" "public"."SkinType" NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "IngredientSkinMatch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductSkinMatch_productId_skinType_key" ON "public"."ProductSkinMatch"("productId", "skinType");

-- CreateIndex
CREATE UNIQUE INDEX "IngredientSkinMatch_ingredientId_skinType_key" ON "public"."IngredientSkinMatch"("ingredientId", "skinType");

-- AddForeignKey
ALTER TABLE "public"."ProductSkinMatch" ADD CONSTRAINT "ProductSkinMatch_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."IngredientSkinMatch" ADD CONSTRAINT "IngredientSkinMatch_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "public"."Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
