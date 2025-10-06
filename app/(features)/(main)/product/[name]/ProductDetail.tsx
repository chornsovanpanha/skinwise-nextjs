import AboutItem from "@/components/AboutItem";
import BadgeItem from "@/components/BadgeItem";
import BoxOutlineWrapper from "@/components/BoxOutlineWrapper";
import Wrapper from "@/components/custom/layout/Wrapper";
import PageHeader from "@/components/PageHeader";
import ProductImageDetail from "@/components/product/DetailProductImage";
import RoutineChartSight from "@/components/RoutineChartSight";
import { Typography } from "@/components/Typography";
import { Badge } from "@/components/ui/badge";
import { AnalyseData, ProductWithDetail } from "@/types";
import Link from "next/link";
import CompareBtn from "./CompareBtn";

const ProductDetail = ({
  product,
  analysis,
}: {
  product: ProductWithDetail;
  analysis?: AnalyseData | null;
}) => {
  const positiveEffects = product.effects.filter(
    (effect) => effect.type == "POSITIVE"
  );
  const negativeEffects = product.effects.filter(
    (effect) => effect.type == "NEGATIVE"
  );

  return (
    <main className="mb-12">
      <PageHeader title="Product Overview" showBackgroundImg />
      <Wrapper className="flex-col sm:space-y-4 gap-8 sm:gap-12">
        {/* **** Product overview ****  */}

        <header className="block md:flex w-full items-start gap-6">
          <section className="product-img flex-1/4 mb-6 md:mb-0 overflow-hidden border border-primary rounded-xl">
            <ProductImageDetail
              src={product?.Image?.at(0)?.url ?? ""}
              alt={product.alias ?? "unnamed-alt-image"}
            />
          </section>

          <section className="detail flex-3/4 space-y-4">
            <Badge className="rounded-2xl text-secondary py-3 px-6 bg-primary/30 w-fit h-fit font-black">
              {product?.brand?.title ?? "Unnamed Brand"}
            </Badge>
            <Typography as="p" variant="h3" className="text-secondary">
              {product?.name ?? "Unnamed Product"}
            </Typography>
            <Typography as="p" variant="default" className="text-secondary">
              {product?.desc ?? "No information description"}
            </Typography>

            <footer className="w-full flex gap-2 items-center">
              <Link
                href={"/my-routine"}
                className="rounded-full bg-primary text-secondary px-8 hover:bg-primary/80 py-2.5"
              >
                Add to routine
              </Link>
              <CompareBtn product={product} />
            </footer>

            {analysis?.score && (
              <RoutineChartSight
                percentage={parseInt(analysis?.score)}
                desc={analysis?.shortDesc}
              />
            )}
          </section>
        </header>

        {/* **** Ingredient Listing ****  */}
        {!!product.ingredients?.length && (
          <section className="ingredient-listing space-y-4">
            <header className="flex gap-2 items-center">
              <Typography as="h6" variant="h6" className="text-secondary">
                Ingredient list
              </Typography>

              <Badge className="rounded-full w-7 p-1 text-secondary">
                {product.ingredients?.length}
              </Badge>
            </header>

            <main className="flex flex-wrap space-y-3 space-x-4 ustify-start">
              {product?.ingredients?.map((item, index) => (
                <Link
                  href={`/ingredient/${item?.ingredient?.alias}`}
                  key={index}
                >
                  <Badge className="rounded-2xl text-secondary py-3 px-6 bg-primary/50 w-fit h-fit hover:bg-primary/80">
                    {item?.ingredient?.name}
                  </Badge>
                </Link>
              ))}
            </main>
          </section>
        )}
        {/* **** About Product ****  */}
        {!!product?.insideGroups?.length && (
          <BoxOutlineWrapper
            title={"What’s inside"}
            className="!my-0  hover-box"
          >
            <main className="block sm:grid gap-4 grid-cols-3 space-y-6 ">
              {product?.insideGroups?.map((item, index) => (
                <AboutItem data={item?.title} key={index} />
              ))}
            </main>
          </BoxOutlineWrapper>
        )}

        {/* **** Positive effects ****  */}
        {!!positiveEffects?.length && (
          <BoxOutlineWrapper
            title={"Positive effects"}
            className="!my-0  hover-box"
          >
            <main className="block sm:grid gap-4 grid-cols-3 space-y-6 ">
              {positiveEffects?.map((item, index) => (
                <BadgeItem
                  key={index}
                  type="positive"
                  title={item.title}
                  subtitle={item.shortDesc ?? ""}
                />
              ))}
            </main>
          </BoxOutlineWrapper>
        )}
        {/* **** Negative effects **** */}
        {!!negativeEffects?.length && (
          <BoxOutlineWrapper
            title={"Potential Hazard"}
            type="negative"
            className="!my-0 hover-box"
          >
            <main className="block sm:grid gap-4 grid-cols-3 space-y-6">
              {negativeEffects?.map((item, index) => (
                <BadgeItem
                  key={index}
                  type="negative"
                  title={item.title}
                  subtitle={item.shortDesc ?? ""}
                />
              ))}
            </main>
          </BoxOutlineWrapper>
        )}
      </Wrapper>
    </main>
  );
};

export default ProductDetail;
