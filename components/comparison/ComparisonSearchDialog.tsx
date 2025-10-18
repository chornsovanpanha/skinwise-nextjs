import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProductSearch } from "@/hooks/api/product/useProductSearch";
import { ProductWithBrandAndImages } from "@/types";
import { TANSTACKQUERY } from "@/utils/constant/queryclient";
import { Search } from "lucide-react";
import { useState } from "react";
import AppInput from "../AppInput";
import SmallProductItem from "../SmallProductItem";
import { useDebounce } from "use-debounce";

const ComparisonSearchDialog = ({
  onClose,
  onSelect,
  initSearch,
}: {
  onClose: () => void;
  initSearch?: string;
  onSelect: (value: ProductWithBrandAndImages) => void;
}) => {
  const [search, setSearch] = useState(initSearch ?? "");
  const [debouncedSearch] = useDebounce(search, 300);
  const { data } = useProductSearch(TANSTACKQUERY.PRODUCTS, {
    search: debouncedSearch,
  });

  return (
    <main>
      <DialogContent
        aria-description="dialog-search-product"
        aria-describedby="dialog"
        className="z-[12000] md:max-w-xl w-full p-0 rounded-2xl overflow-hidden border-0 [&>button]:hidden bg-[#F7FCFD] max-w-[350px] sm:max-w-md touch-auto"
      >
        {/* Header without extra padding */}
        <DialogHeader className="p-0 bg-secondary py-4 px-4 h-24">
          <DialogTitle className="w-full">
            <AppInput
              label=""
              id="search"
              icon={<Search className="w-4 h-4 text-secondary" />}
              placeholder="Search for a product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-6 border-b bg-white placeholder:text-gray-4 leading-[1.2]"
            />
          </DialogTitle>
        </DialogHeader>
        {/* Scrollable product list */}
        <DialogDescription asChild>
          <ScrollArea className="h-96 p-0 px-2 ">
            {data && data?.length > 0 ? (
              <ul className="space-y-2">
                {data?.map((product) => (
                  <SmallProductItem
                    highlight={search}
                    product={product}
                    key={product.id}
                    onPress={() => {
                      onClose();
                      onSelect(product);
                    }}
                  />
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm text-center mt-6">
                No products found
              </p>
            )}
          </ScrollArea>
        </DialogDescription>
      </DialogContent>
    </main>
  );
};

export default ComparisonSearchDialog;
