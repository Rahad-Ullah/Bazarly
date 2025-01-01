import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/pages/Products/ProductUtils/ProductCard";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { IProduct } from "@/types/TProduct";

const FlashSale = () => {
  const { data, isFetching } = useGetAllProductsQuery({
    limit: 8,
  });
  const products = data?.data;

  return (
    <div className="py-16">
      <Container>
        <div className="space-y-8 mb-12">
          {/* section header */}
          <SectionHeading
            heading="Flash Sales"
            subHeading="Don't miss out—grab the hottest deals before they're gone!"
          />
        </div>

        {/* data mapping */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {products?.map((product: IProduct, index: number) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
        {/* skeleton */}
        {isFetching && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-6 justify-between items-center mb-16">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-52 w-full rounded-xl" />
                <div className="space-y-4">
                  <Skeleton className="h-4 w-10/12" />
                  <Skeleton className="h-6 w-4/12" />
                  <Skeleton className="h-4 w-5/12" />
                  <Skeleton className="h-10 w-12/12" />
                </div>
              </div>
            ))}
          </div>
        )}
        {/* not found */}
        {!isFetching && products?.length < 1 && (
          <h1 className="text-center text-lg text-gray-500 my-10">
            No Data Found
          </h1>
        )}
      </Container>
    </div>
  );
};

export default FlashSale;
