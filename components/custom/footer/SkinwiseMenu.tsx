import { Typography } from "@/components/Typography";
import Link from "next/link";
import { aboutMenus } from "./footer-item";

const SkinwiseMenu = () => {
  return (
    <div>
      <h2 className="text-base font-semibold leading-4 text-gray-800">
        Support
      </h2>
      {aboutMenus?.map((navbar) => (
        <div key={navbar.id} className="my-7">
          <Link href={`/${navbar.href}`}>
            <Typography
              variant="body1"
              className="hover:text-secondary/60 transition-colors ease-in-out duration-100"
            >
              {navbar.name}
            </Typography>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SkinwiseMenu;
