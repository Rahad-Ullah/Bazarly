import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import CustomPagination from "@/components/shared/Pagination";
import { useState } from "react";
import { useGetRecentProductQuery } from "@/redux/features/recentProducts/recentProductsApi";
import { IProduct } from "@/types/TProduct";
import RecentViewedItem from "./RecentViewedItem";

const RecentViewed = () => {
  const [page, setPage] = useState(1);

  // get products data
  const { data, isFetching } = useGetRecentProductQuery(undefined);
  const products = data?.data?.map(
    (item: { product: IProduct }) => item.product
  );

  const pages = 1;

  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6">
      <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
        <Card className="grid flex-1 h-full shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Recent Viewed Products
            </CardTitle>
            <CardDescription>
              Manage your products and view their details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] md:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Rating</TableHead>
                  <TableHead className="hidden md:table-cell">Price</TableHead>
                  <TableHead>Discount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isFetching
                  ? Array.from({ length: 5 })?.map((_, index) => (
                      <TableRow key={index}>
                        <TableCell className="">
                          <Skeleton className="w-full h-16" />
                        </TableCell>
                        <TableCell className="font-medium hidden md:table-cell">
                          <Skeleton className="w-full h-5" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="w-full h-5" />
                        </TableCell>
                        <TableCell className="">
                          <Skeleton className="w-full h-5" />
                        </TableCell>
                        <TableCell className="">
                          <Skeleton className="w-full h-5" />
                        </TableCell>
                      </TableRow>
                    ))
                  : // display date when fetching completed
                    products?.map((item: IProduct, index: number) => (
                      <RecentViewedItem key={index} item={item} />
                    ))}
              </TableBody>
              {products?.length < 1 && (
                <TableCaption>
                  {/* show no data found message if bookings is empty */}
                  <div className="text-center w-full mt-14">
                    <h3 className="text-2xl font-bold tracking-tight">
                      You have no products
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      You can start enjoying as soon as you visit a product.
                    </p>
                    <Link to={"/products"}>
                      <Button className="mt-4">Buy Now</Button>
                    </Link>
                  </div>
                </TableCaption>
              )}
            </Table>
          </CardContent>
          {/* showing range of pagination */}
          {products?.length > 0 && (
            <CardFooter className="">
              <CustomPagination
                page={page}
                setPage={setPage}
                pages={pages}
                align="start"
              />
              <div className="hidden md:block text-xs text-muted-foreground">
                Showing <strong>1-{products?.length}</strong> of{" "}
                <strong>{products?.length}</strong> items
              </div>
            </CardFooter>
          )}
        </Card>
      </main>
    </div>
  );
};

export default RecentViewed;
