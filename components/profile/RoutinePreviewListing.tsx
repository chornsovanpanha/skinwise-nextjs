import { RoutineSubItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Card } from "../ui/card";
const maxUnit = 10;

const RoutineListing = ({ routines }: { routines?: RoutineSubItem[] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {/* **** Main Routine listing preview in the box grid ****  */}
      {routines?.map((routine, i) => (
        <Card
          key={i}
          className="cursor-pointer relative w-full aspect-square overflow-hidden hover:opacity-80 hover:scale-110 transition-transform ease-in-out duration-200"
        >
          <Link href={`/my-routine`}>
            <Image
              src={routine.product.Image?.at(0)?.url ?? ""}
              alt={`routine-${routine.id}`}
              fill
              className="object-contain"
            />
          </Link>
        </Card>
      ))}

      {/* **** Fill in the box grid ****  */}
      {Array.from(
        { length: maxUnit - (routines ? routines?.length : 1) },
        (_, index) => (
          <Card
            key={index}
            className="w-full aspect-square bg-primary/50 border-0 hover:opacity-80 hover:scale-110 transition-transform ease-in-out duration-200"
          />
        )
      )}
    </div>
  );
};

export default RoutineListing;
