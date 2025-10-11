import { ProductWithBrandAndImages } from "@/types";
import Wrapper from "../custom/layout/Wrapper";
import MainProductItem from "../MainProductItem";

const PopularProductListing = ({
  products,
}: {
  products: ProductWithBrandAndImages[];
}) => {
  return (
    <Wrapper maxHeight={false} className="flex-col">
      <main className="h-full block sm:grid sm:grid-cols-2 lg:grid-cols-3 w-full gap-12 space-y-6">
        {products?.map((product) => (
          <MainProductItem data={product} key={product.id} />
        ))}
      </main>
    </Wrapper>
  );
};

export default PopularProductListing;
