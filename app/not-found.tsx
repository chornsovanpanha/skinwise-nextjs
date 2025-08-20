"use client";

import { NotFoundSvg } from "@/assets";
import FullWidthLayout from "@/components/custom/layout/FullWidthLayout";
import NotFoundPlaceholder from "@/components/custom/layout/NotFoundPlaceholder";

const NotFound = () => {
  return (
    <FullWidthLayout>
      <NotFoundPlaceholder svgPath={NotFoundSvg} defaultLink="/" />
    </FullWidthLayout>
  );
};

export default NotFound;
