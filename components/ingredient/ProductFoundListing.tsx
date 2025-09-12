import { productsFoundIn } from "@/app/(features)/(main)/ingredient/data";
import React from "react";
import ProductItem from "../ProductItem";
const ProductFoundListing = () => {
  return (
    <main className="block sm:grid sm:grid-cols-2 lg:grid-cols-3 w-full gap-12 space-y-6">
      {productsFoundIn?.map((product) => (
        <ProductItem data={product} key={product.id} />
      ))}
    </main>
  );
};

export default ProductFoundListing;
