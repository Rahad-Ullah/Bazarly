import Container from "@/components/shared/Container";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import ProductCard from "./ProductCard";
import { IProduct } from "@/types/TProduct";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/AuthSlice";
import SectionHeading from "@/components/shared/SectionHeader";

const FeaturedProducts = () => {
  const user = useAppSelector(selectCurrentUser);

  // const observer = useRef<IntersectionObserver | null>(null);

  const { data, isFetching } = useGetAllProductsQuery({
    limit: 12,
    userEmail: user?.email,
  });
  const products = data?.data;

  // // Concatenate fetched data
  // const [products, setProducts] = useState<IProduct[]>([]);

  // // Update products when API data changes
  // useEffect(() => {
  //   if (data?.data) {
  //     setProducts((prev) => [...prev, ...data.data]);
  //   }
  // }, [data?.data]);

  // Implementation of infinite scrolling
  // const lastElementRef = useCallback(
  //   (node: HTMLDivElement | null) => {
  //     if (isFetching) return;

  //     if (observer.current) observer.current.disconnect();

  //     observer.current = new IntersectionObserver((entries) => {
  //       // Check if the last item is visible and whether more data exists
  //       if (
  //         entries[0].isIntersecting &&
  //         products.length < (data?.meta?.total || 0)
  //       ) {
  //         setPage((prevPage) => prevPage + 1); // Load the next page
  //       }
  //     });

  //     if (node) observer.current.observe(node);
  //   },
  //   [isFetching, products, data]
  // );

  return (
    <div className="py-16 bg-slate-50">
      <Container>
        <div className="space-y-8 mb-12">
          {/* section header */}
          <SectionHeading
            heading="Featured Products"
            subHeading="Shop the latest trends and unbeatable deals today!"
          />
        </div>

        {/* data mapping */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {products?.map((product: IProduct, index: number) => {
            if (products?.length === index + 1) {
              return (
                <div key={index}>
                  <ProductCard product={product} />
                </div>
              );
            } else {
              return <ProductCard key={index} product={product} />;
            }
          })}
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

export default FeaturedProducts;
