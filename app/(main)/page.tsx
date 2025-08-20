import { getProductActions } from "@/actions/product/product.action";
import { Typography } from "@/components/Typography";

export default async function Home() {
  const products = await getProductActions();
  return (
    <div className="">
      {products.map((product) => (
        <Typography key={product.id} variant="h6">
          {product.name}
        </Typography>
      ))}
    </div>
  );
}
