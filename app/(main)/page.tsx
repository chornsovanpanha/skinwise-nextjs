import { redirect } from "next/navigation";

export default async function Home() {
  return redirect("/login");
  // const products = await getProductActions();
  // return (
  //   <div className="">
  //     {products.map((product) => (
  //       <Typography key={product.id} variant="h6">
  //         {product.name}
  //       </Typography>
  //     ))}
  //   </div>
  // );
}
