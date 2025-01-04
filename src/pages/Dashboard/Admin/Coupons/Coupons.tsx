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
import CustomPagination from "@/components/shared/Pagination";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import CouponsItem from "./CouponsItem";
import { useGetAllCouponsQuery } from "@/redux/features/coupon/couponApi";
import { TCoupon } from "@/types/TCoupon";

const Coupons = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // get coupons data
  const { data, isFetching } = useGetAllCouponsQuery({
    searchTerm: search,
    page,
  });
  const coupons = data?.data;

  const pages = Math.ceil(data?.meta?.total / data?.meta?.limit);

  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6">
      <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
        <Card className="grid flex-1 h-full shadow-none">
          <CardHeader className="px-4 md:px-6">
            <CardTitle className="text-2xl font-bold">Coupons</CardTitle>
            <CardDescription>
              Manage coupons and view their details.
            </CardDescription>
            <div className="pt-6">
              <Input
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Search by coupon code"
                className="max-w-sm"
              />
            </div>
          </CardHeader>
          <CardContent className="px-4 md:px-6">
            <Table className="border">
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Start Date
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    End Date
                  </TableHead>
                  <TableHead>Per User Limit</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Total Limit
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Total Used
                  </TableHead>
                  <TableHead className="">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isFetching
                  ? Array.from({ length: 5 })?.map((_, index) => (
                      <TableRow key={index}>
                        <TableCell className="">
                          <Skeleton className="w-full h-5" />
                        </TableCell>
                        <TableCell className="">
                          <Skeleton className="w-full h-5" />
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Skeleton className="w-full h-5" />
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Skeleton className="w-full h-5" />
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Skeleton className="w-full h-5" />
                        </TableCell>
                        <TableCell className="">
                          <Skeleton className="w-full h-5" />
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Skeleton className="w-full h-5" />
                        </TableCell>
                        <TableCell className="">
                          <Skeleton className="w-full h-5" />
                        </TableCell>
                      </TableRow>
                    ))
                  : // display date when fetching completed
                    coupons?.map((item: TCoupon, index: number) => (
                      <CouponsItem key={index} coupon={item} />
                    ))}
              </TableBody>
              {coupons?.length < 1 && (
                <TableCaption>
                  {/* show no data found message if bookings is empty */}
                  <div className="text-center w-full mt-14">
                    <h3 className="text-2xl font-bold tracking-tight">
                      You have no coupons
                    </h3>
                    {/* <p className="text-sm text-muted-foreground">
                      You can start enjoying as soon as you create a category.
                    </p>
                    <Link to={"/coupons"}>
                      <Button className="mt-4">Go coupons</Button>
                    </Link> */}
                  </div>
                </TableCaption>
              )}
            </Table>
          </CardContent>
          {/* showing range of pagination */}
          {coupons?.length > 0 && (
            <CardFooter className="">
              <CustomPagination
                page={page}
                setPage={setPage}
                pages={pages}
                align="start"
              />
              <div className="hidden md:block text-xs text-muted-foreground">
                Showing <strong>1-{coupons?.length}</strong> of{" "}
                <strong>{coupons?.length}</strong> items
              </div>
            </CardFooter>
          )}
        </Card>
      </main>
    </div>
  );
};

export default Coupons;
