import { NotFoundSvg } from "@/assets";
import NotFoundPlaceholder from "@/components/custom/layout/NotFoundPlaceholder";
import Wrapper from "@/components/custom/layout/Wrapper";
import { Typography } from "@/components/Typography";

export default function NotFound() {
  return (
    <Wrapper
      maxHeight={false}
      className="flex flex-col w-full justify-center items-center"
    >
      <Typography variant="h2" className="text-secondary ">
        Item Not Found
      </Typography>
      <Typography variant="body1" className="text-secondary ">
        Lost? Click the button below to head back to our homepage 👇
      </Typography>
      <NotFoundPlaceholder svgPath={NotFoundSvg} defaultLink="/" />
    </Wrapper>
  );
}
