import Image from "next/image";
import Link from "next/link";

const NotFoundPlaceholder = ({
  svgPath,
  defaultLink = "/dashboard",
}: {
  svgPath: string;
  defaultLink?: string;
}) => {
  return (
    <>
      <Image
        src={svgPath}
        alt="not-found-image"
        width={400}
        height={400}
        className="w-3/5 sm:w-2/5 md:w-1/3 lg:w-1/4 h-auto mb-6"
      />

      <Link
        href={defaultLink}
        className="px-6 py-3 bg-secondary rounded-md hover:bg-secondary/90 transition text-primary"
      >
        Go Back Home
      </Link>
    </>
  );
};

export default NotFoundPlaceholder;
