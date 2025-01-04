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
import { Input } from "@/components/ui/input";
import CategoriesItem from "./CategoriesItem";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";

const Categories = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // get shops data
  const { data, isFetching } = useGetAllCategoriesQuery({
    searchTerm: search,
    page,
  });
  const categories = data?.data;

  const pages = Math.ceil(data?.meta?.total / data?.meta?.limit);

  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6">
      <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
        <Card className="grid flex-1 h-full shadow-none">
          <CardHeader className="px-4 md:px-6">
            <CardTitle className="text-2xl font-bold">Categories</CardTitle>
            <CardDescription>
              Manage categories and view their details.
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
                  <TableHead className="w-[100px] md:table-cell">
                    <span className="">Image</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Description
                  </TableHead>
                  <TableHead className="">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isFetching
                  ? Array.from({ length: 5 })?.map((_, index) => (
                      <TableRow key={index}>
                        <TableCell className="">
                          <Skeleton className="w-full h-16" />
                        </TableCell>
                        <TableCell className="">
                          <Skeleton className="w-full h-5" />
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Skeleton className="w-full h-5" />
                        </TableCell>
                        <TableCell className="">
                          <Skeleton className="w-full h-5" />
                        </TableCell>
                      </TableRow>
                    ))
                  : // display date when fetching completed
                    categories?.map((item: IShop, index: number) => (
                      <CategoriesItem key={index} category={item} />
                    ))}
              </TableBody>
              {categories?.length < 1 && (
                <TableCaption>
                  {/* show no data found message if bookings is empty */}
                  <div className="text-center w-full mt-14">
                    <h3 className="text-2xl font-bold tracking-tight">
                      You have no categories
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      You can start enjoying as soon as you create a category.
                    </p>
                    <Link to={"/categories"}>
                      <Button className="mt-4">Go categories</Button>
                    </Link>
                  </div>
                </TableCaption>
              )}
            </Table>
          </CardContent>
          {/* showing range of pagination */}
          {categories?.length > 0 && (
            <CardFooter className="">
              <CustomPagination
                page={page}
                setPage={setPage}
                pages={pages}
                align="start"
              />
              <div className="hidden md:block text-xs text-muted-foreground">
                Showing <strong>1-{categories?.length}</strong> of{" "}
                <strong>{categories?.length}</strong> items
              </div>
            </CardFooter>
          )}
        </Card>
      </main>
    </div>
  );
};

export default Categories;
