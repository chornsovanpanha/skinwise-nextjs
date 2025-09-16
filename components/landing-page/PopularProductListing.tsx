import { popularProductListings } from "@/utils/mock";
import Wrapper from "../custom/layout/Wrapper";
import ProductItem from "../ProductItem";

const PopularProductListing = () => {
  return (
    <Wrapper maxHeight={false} className="flex-col">
      <main className="h-full block sm:grid sm:grid-cols-2 lg:grid-cols-3 w-full gap-12 space-y-6">
        {popularProductListings?.map((product) => (
          <ProductItem data={product} key={product.id} />
        ))}
      </main>
    </Wrapper>
  );
};

export default PopularProductListing;
