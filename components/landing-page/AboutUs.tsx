import { ProductShowcaseLeft, ProductShowRight } from "@/assets";
import Image from "next/image";
import Wrapper from "../custom/layout/Wrapper";
import { Typography } from "../Typography";

const AboutUs = () => {
  return (
    <Wrapper className="flex-col my-24 mb-36" maxHeight={false}>
      <main className="block sm:grid md:grid-cols-3 lg:grid-cols-6 gap-6 space-y-12">
        <section className="relative justify-self-center group col-span-4 lg:col-auto">
          {/* Rotation wrapper */}
          <div className="rotate-[-8deg] group-hover:rotate-0 transition-transform duration-300 ease-in-out  grid place-content-center">
            {/* Clipping wrapper */}
            <div className="w-[180px] h-[250px] overflow-hidden rounded-2xl">
              <Image
                alt="image-show-case-one"
                width={200}
                height={300}
                src={ProductShowcaseLeft}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>
          </div>
        </section>

        <section className="content col-span-4">
          <header className="flex text-center justify-center w-full gap-2">
            <Typography as="p" variant="h2">
              About
            </Typography>
            <Typography as="p" variant="h2" className="text-primary">
              Us
            </Typography>
          </header>

          <div className=" flex justify-center my- sm:my-0">
            <Typography
              as="p"
              variant="default"
              className="text-secondary max-w-xl"
            >
              At Skin Wise, we believe skincare should be simple, trustworthy,
              and tailored to you. Our mission is to empower everyone to make
              informed choices about their skin by providing clear,
              science-backed insights into products, ingredients, and routines.
            </Typography>
          </div>
        </section>
        <section className="relative justify-self-center group mt-12 col-span-4 lg:col-auto">
          {/* Rotation wrapper */}
          <div className="rotate-[13deg] group-hover:rotate-0 transition-transform duration-300 ease-in-out  grid place-content-center">
            {/* Clipping wrapper */}
            <div className="w-[180px] h-[250px] overflow-hidden rounded-2xl">
              <Image
                alt="image-show-case-one"
                width={200}
                height={300}
                src={ProductShowRight}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>
          </div>
        </section>
      </main>
    </Wrapper>
  );
};

export default AboutUs;
