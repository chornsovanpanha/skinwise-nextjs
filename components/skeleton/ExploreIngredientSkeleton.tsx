import { Skeleton } from "@/components/ui/skeleton";
import Wrapper from "../custom/layout/Wrapper";

export default function ExploreIngredientSkeleton() {
  return (
    <Wrapper maxHeight={false} className="flex flex-col h-full">
      <div className="h-fit sm:grid grid-cols-4 gap-4 overflow-x-scroll no-scrollbar">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton
            className="h-[125px] w-full rounded-xl  bg-gray-200"
            key={i}
          ></Skeleton>
        ))}
      </div>
    </Wrapper>
  );
}
