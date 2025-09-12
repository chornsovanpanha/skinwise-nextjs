import { BannerLanding } from "@/assets";
import Image from "next/image";
import AppInput from "../AppInput";
import { Typography } from "../Typography";

const HeaderSearchBanner = () => {
  return (
    <section className="w-full h-[590px] bg-gray-100 relative ">
      <div className="bg-secondary/40 w-full h-full absolute" />
      <Image
        src={BannerLanding}
        alt="banner"
        className="object-cover  w-full h-full"
      />

      <div className="absolute top-0 bottom-0  left-0 right-0 flex justify-center items-center ">
        <header className="text-center">
          <Typography variant="h2" className="text-primary">
            Find skincare that works
          </Typography>
          <Typography variant="body1" className="text-primary">
            see what’s inside any product
          </Typography>
          {/* Search area text  */}
          <AppInput
            id="search"
            label=""
            type="text"
            className=" bg-secondary border-0 text-primary py-8 my-4 rounded-2xl "
            placeholder="Type to search for product or ingredient...."
          />
        </header>
      </div>
    </section>
  );
};

export default HeaderSearchBanner;
