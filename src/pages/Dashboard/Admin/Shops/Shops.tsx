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
import { IShop } from "@/types/TShop";
import { useGetAllShopsQuery } from "@/redux/features/shop/shopApi";
import ShopItem from "./ShopItem";
import { Input } from "@/components/ui/input";

const Shops = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // get shops data
  const { data, isFetching } = useGetAllShopsQuery({
    searchTerm: search,
    page,
  });
  const shops = data?.data;

  const pages = 1;

  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6">
      <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
        <Card className="grid flex-1 h-full shadow-none">
          <CardHeader className="px-4 md:px-6">
            <CardTitle className="text-2xl font-bold">Shops</CardTitle>
            <CardDescription>
              Manage shops and view their details.
            </CardDescription>
            <div className="pt-6">
              <Input
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Search by name, email or phone"
                className="max-w-sm"
              />
            </div>
          </CardHeader>
          <CardContent className="px-4 md:px-6">
            <Table className="border">
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] md:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Rating</TableHead>
                  <TableHead className="">Reviews</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Followers
                  </TableHead>
                  <TableHead className="">Products</TableHead>
                  <TableHead className="">Status</TableHead>
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
                        <TableCell className="">
                          <Skeleton className="w-full h-5" />
                        </TableCell>
                        <TableCell className="">
                          <Skeleton className="w-full h-5" />
                        </TableCell>
                      </TableRow>
                    ))
                  : // display date when fetching completed
                    shops?.map((item: IShop, index: number) => (
                      <ShopItem key={index} shop={item} />
                    ))}
              </TableBody>
              {shops?.length < 1 && (
                <TableCaption>
                  {/* show no data found message if bookings is empty */}
                  <div className="text-center w-full mt-14">
                    <h3 className="text-2xl font-bold tracking-tight">
                      You have no shops
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      You can start enjoying as soon as you visit a shop.
                    </p>
                    <Link to={"/shops"}>
                      <Button className="mt-4">Go Shops</Button>
                    </Link>
                  </div>
                </TableCaption>
              )}
            </Table>
          </CardContent>
          {/* showing range of pagination */}
          {shops?.length > 0 && (
            <CardFooter className="">
              <CustomPagination
                page={page}
                setPage={setPage}
                pages={pages}
                align="start"
              />
              <div className="hidden md:block text-xs text-muted-foreground">
                Showing <strong>1-{shops?.length}</strong> of{" "}
                <strong>{shops?.length}</strong> items
              </div>
            </CardFooter>
          )}
        </Card>
      </main>
    </div>
  );
};

export default Shops;
