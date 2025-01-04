/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { MoreHorizontal } from "lucide-react";
import { ICustomer } from "@/types/TCustomer";
import { useState } from "react";
import CustomPagination from "@/components/shared/Pagination";
import { Badge } from "@/components/ui/badge";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { useGetShopFollowersQuery } from "@/redux/features/followedShop/followedShopApi";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/AuthSlice";

const ShopFollowers = () => {
  const [page, setPage] = useState(1);

  const user = useAppSelector(selectCurrentUser);

  // get followers data
  const { data, isFetching } = useGetShopFollowersQuery(user?.email);
  const followers = data?.data?.data;
  const pages = Math.ceil(data?.data?.meta?.total / data?.data?.meta?.limit);

  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6">
      <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
        <Card className="grid flex-1 h-full shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Followers</CardTitle>
            <CardDescription>
              Manage followers and view their details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table className="border">
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] md:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
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
                      </TableRow>
                    ))
                  : // display date when fetching completed
                    followers?.map((item: ICustomer, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          <img
                            src={item.profilePhoto}
                            alt="user"
                            className="w-full max-w-16"
                          />
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <p className="font-semibold">{item.name}</p>
                        </TableCell>
                        <TableCell className="">{item?.email}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {item?.phoneNumber}
                        </TableCell>
                        <TableCell className="">
                          <Badge
                            variant={"outline"}
                            className={`rounded-full ${
                              item.user.status === "BLOCKED" && "text-red-500"
                            }`}
                          >
                            {capitalizeFirstLetter(item.user.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="space-y-1"
                            >
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
              {followers?.length < 1 && (
                <TableCaption>
                  {/* show no data found message */}
                  <div className="text-center w-full mt-14">
                    <h3 className="text-2xl font-bold tracking-tight">
                      No customer found
                    </h3>
                    {/* <p className="text-sm text-muted-foreground">
                      You can start enjoying as soon as you order a product.
                    </p> */}
                    {/* <Link to={"/products"}>
                      <Button className="mt-4">Buy Now</Button>
                    </Link> */}
                  </div>
                </TableCaption>
              )}
            </Table>
          </CardContent>
          {/* showing range of pagination */}
          <CardFooter>
            <CustomPagination
              pages={pages}
              page={page}
              setPage={setPage}
              align="start"
            />
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-{followers?.length}</strong> of{" "}
              <strong>{followers?.length}</strong>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default ShopFollowers;
