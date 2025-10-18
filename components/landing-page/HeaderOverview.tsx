import { Separator } from "@radix-ui/react-dropdown-menu";
import Wrapper from "../custom/layout/Wrapper";
import { Typography } from "../Typography";
import clsx from "clsx";
type HeaderOverviewProps = {
  shortDesc: string;
  shortDescPrimary: string;
  titlePrimary: string;
  title: string;
  orientation: "left" | "right";
};
const HeaderOverview = ({
  orientation = "left",
  shortDesc,
  shortDescPrimary,
  title,
  titlePrimary,
}: HeaderOverviewProps) => {
  return (
    <Wrapper maxHeight={false}>
      <header
        className={clsx(
          "block  sm:flex items-center justify-between w-full h-full ",
          {
            "sm:flex-row-reverse w-full gap-4": orientation == "left",
          }
        )}
      >
        {/* left Section */}
        <section
          className={clsx("left flex w-full  sm:w-fit items-center", {
            "flex-row-reverse": orientation == "left",
          })}
        >
          <div
            className={clsx("row-one w-full", {
              "w-full block md:flex items-end justify-end gap-2  text-right":
                orientation == "left",
            })}
          >
            <Typography variant="h2" as="p">
              {title}
            </Typography>
            <Typography variant="h2" as="p" className="text-primary">
              {titlePrimary}{" "}
            </Typography>
          </div>
          <div className="row-two w-30 bg-primary">
            <Separator className="h-0.5" />
          </div>
        </section>
        {/* Right Section */}

        <section className="right">
          <Typography
            variant="default"
            as="p"
            className="text-gray-6 text-end "
          >
            {shortDesc}
          </Typography>
          <Typography
            variant="default"
            as="p"
            className="text-gray-6 text-end "
          >
            {shortDescPrimary}
          </Typography>
        </section>
      </header>
    </Wrapper>
  );
};

export default HeaderOverview;
