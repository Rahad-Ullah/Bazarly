import { Badge } from "@/components/ui/badge";
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
  DropdownMenuItem,
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
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { formatDate } from "@/utils/formatDate";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "@/redux/features/order/orderApi";
import { IOrder } from "@/types/TOrder";
import OrderDetails from "./OrderDetailsDialogue";
import CustomPagination from "@/components/shared/Pagination";
import { useState } from "react";

const MyOrders = () => {
  const [page, setPage] = useState(1);

  // get orders data
  const { data, isFetching } = useGetMyOrdersQuery(undefined);
  const orders = data?.data?.data;

  const pages = Math.ceil(data?.data?.meta?.total / data?.data?.meta?.limit);

  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6">
      <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
        <Card className="grid flex-1 h-full shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">My Orders</CardTitle>
            <CardDescription>
              Manage your orders and view their details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {/* <TableHead className="hidden w-[100px] md:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead> */}
                  <TableHead>Date</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Payment Type
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Payment Status
                  </TableHead>
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
                    orders?.map((item: IOrder, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {formatDate(new Date(item.createdAt))}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge
                            variant="outline"
                            className={`${
                              item?.status === "CANCELLED" && "text-red-500"
                            }`}
                          >
                            {capitalizeFirstLetter(item?.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="">
                          {item?.orderItem?.length}
                        </TableCell>
                        <TableCell className="">
                          ৳ {item?.totalAmount}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline">{item?.paymentType}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge
                            variant="outline"
                            className={`${
                              item?.paymentStatus === "UNPAID" && "text-red-500"
                            }`}
                          >
                            {capitalizeFirstLetter(item?.paymentStatus)}
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
                              {/* view details button */}
                              <OrderDetails order={item} />
                              {/* cancel button */}
                              {item?.paymentType === "ONLINE" &&
                                item?.paymentStatus === "UNPAID" && (
                                  <DropdownMenuItem
                                    // onClick={() => handleCancelBooking(item?._id)}
                                    className="gap-1"
                                  >
                                    Pay Now
                                  </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
              {!orders?.length && (
                <TableCaption>
                  {/* show no data found message if bookings is empty */}
                  <div className="text-center w-full mt-14">
                    <h3 className="text-2xl font-bold tracking-tight">
                      You have no orders
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      You can start enjoying as soon as you order a product.
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
          {orders?.length > 0 && (
            <CardFooter className="">
              <CustomPagination
                page={page}
                setPage={setPage}
                pages={pages}
                align="start"
              />
              <div className="hidden md:block text-xs text-muted-foreground">
                Showing <strong>1-{orders?.length}</strong> of{" "}
                <strong>{orders?.length}</strong> items
              </div>
            </CardFooter>
          )}
        </Card>
      </main>
    </div>
  );
};

export default MyOrders;
