import AboutItem from "@/components/AboutItem";
import BadgeItem from "@/components/BadgeItem";
import BoxOutlineWrapper from "@/components/BoxOutlineWrapper";
import Wrapper from "@/components/custom/layout/Wrapper";
import PageHeader from "@/components/PageHeader";
import { AboutProduct, positiveEffects } from "../data";
import { Typography } from "@/components/Typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import RoutineChartSight from "@/components/RoutineChartSight";
import Link from "next/link";

const ProductDetail = ({ name }: { name: string }) => {
  return (
    <main className="mb-12">
      <PageHeader title="Product Overview" showBackgroundImg />
      <Wrapper className="flex-col sm:space-y-4 gap-8 sm:gap-12">
        {/* **** Product overview ****  */}

        <header className="block md:flex w-full items-start gap-6">
          <section className="product-img flex-1/4 mb-6 md:mb-0 overflow-hidden border border-primary rounded-xl">
            <Image
              src={"https://storage.skinsort.com/vhfn18oeucujg2wmaqz2m4a6xy2a"}
              alt="Image-Cover"
              width={100}
              height={100}
              className="h-full w-full object-contain  transform transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </section>

          <section className="detail flex-3/4 space-y-4">
            <Badge className="rounded-2xl text-secondary py-3 px-6 bg-primary/30 w-fit h-fit font-black">
              BRAND NAME
            </Badge>
            <Typography as="p" variant="h3" className="text-secondary">
              {name}
            </Typography>
            <Typography as="p" variant="default" className="text-secondary">
              A facial treatment with 11 ingredients, including benzoyl peroxide
              and exfoliants.
            </Typography>

            <footer className="w-full flex gap-2 items-center">
              <Button className="rounded-full bg-primary/30 text-secondary px-6">
                Add to routine
              </Button>
              <Link
                href={"/product-comparison"}
                className="rounded-full bg-secondary text-primary px-8 hover:bg-secondary/80 py-2.5"
              >
                Compare
              </Link>
            </footer>

            <RoutineChartSight
              percentage={99}
              desc={
                " smoothness and firm on your skin ingredient suit your personal oily type"
              }
            />
          </section>
        </header>

        {/* **** Ingredient Listing ****  */}

        <section className="ingredient-listing space-y-4">
          <header className="flex gap-2 items-center">
            <Typography as="h6" variant="h6" className="text-secondary">
              Ingredient list
            </Typography>

            <Badge className="rounded-full w-7 p-1 text-secondary">10</Badge>
          </header>

          <main className="block md:grid gap-4 md:grid-cols-3 lg:grid-cols-4 space-y-3 space-x-4">
            {AboutProduct?.map((item, index) => (
              <Badge
                key={index}
                className="rounded-2xl text-secondary py-3 px-6 bg-primary/50 w-fit h-fit"
              >
                {item}
              </Badge>
            ))}
          </main>
        </section>

        {/* **** About Product ****  */}
        <BoxOutlineWrapper title={"What’s inside"} className="!my-0">
          <main className="block sm:grid gap-4 grid-cols-3 space-y-6 ">
            {AboutProduct?.map((item, index) => (
              <AboutItem data={item} key={index} />
            ))}
          </main>
        </BoxOutlineWrapper>

        {/* **** Positive effects ****  */}
        <BoxOutlineWrapper title={"Positive effects"} className="!my-0">
          <main className="block sm:grid gap-4 grid-cols-3 space-y-6 ">
            {positiveEffects?.map((_, index) => (
              <BadgeItem key={index} type="positive" />
            ))}
          </main>
        </BoxOutlineWrapper>
        {/* **** Negative effects **** */}
        <BoxOutlineWrapper
          title={"Potential Hazard"}
          type="negative"
          className="!my-0"
        >
          <main className="block sm:grid gap-4 grid-cols-3 space-y-6">
            {positiveEffects?.map((_, index) => (
              <BadgeItem key={index} type="negative" />
            ))}
          </main>
        </BoxOutlineWrapper>
      </Wrapper>
    </main>
  );
};

export default ProductDetail;
