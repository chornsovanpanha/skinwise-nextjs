import { Typography } from "@/components/Typography";
import Link from "next/link";
import { toolFeatureMenus } from "./footer-item";

const FeatureMenu = () => {
  return (
    <div className="sm:ml-0 ml-8">
      <h1 className="text-base font-black leading-4 text-gray-800">Tools</h1>

      {toolFeatureMenus?.map((navbar) => (
        <div key={navbar.id} className="my-7">
          <Link href={`/${navbar.href}`}>
            <Typography
              variant="body1"
              className="hover:text-secondary/60 transition-colors ease-in-out duration-100"
              as="p"
            >
              {navbar.name}
            </Typography>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FeatureMenu;
