import {
  IngredientProductWithDetails,
  ProductWithBrandAndImages,
} from "@/types";
import MainProductItem from "../MainProductItem";
const ProductFoundListing = ({
  products,
}: {
  products: IngredientProductWithDetails[];
}) => {
  return (
    <main className="block sm:grid sm:grid-cols-2 lg:grid-cols-3 w-full gap-12 space-y-6">
      {products?.map((product, index) => (
        <MainProductItem
          data={product?.product as ProductWithBrandAndImages}
          key={index}
        />
      ))}
    </main>
  );
};

export default ProductFoundListing;
