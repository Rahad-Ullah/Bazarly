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
import { MoreHorizontal, Plus } from "lucide-react";
import { useState } from "react";
import CustomPagination from "@/components/shared/Pagination";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import {
  useDeleteProductMutation,
  useDuplicateProductMutation,
  useGetAllProductsQuery,
} from "@/redux/features/product/productApi";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/AuthSlice";
import { IProduct } from "@/types/TProduct";
import { EditProductDialogue } from "./EditProduct";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import AddProductForm from "@/components/form/product/AddProduct";

const MyProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const user = useAppSelector(selectCurrentUser);

  //   get products data
  const { data, isFetching } = useGetAllProductsQuery({
    searchTerm,
    page,
    vendorEmail: user?.email,
  });
  const products = data?.data;
  const pages = Math.ceil(data?.meta?.total / data?.meta?.limit);

  // suspend user
  const [duplicateProduct] = useDuplicateProductMutation();
  const handleDuplicateProduct = async (product: IProduct) => {
    toast.loading("Pending...", { id: "Duplicate_Product" });
    try {
      const res = await duplicateProduct({
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        discount: product.discount,
        stock: product.stock,
        categoryId: product.categoryId,
        shopId: product.shopId,
      }).unwrap();
      if (res.success) {
        toast.success("Successfully duplicated", { id: "Duplicate_Product" });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message, { id: "Duplicate_Product" });
      console.log(error);
    }
  };

  // delete product
  const [deleteProduct] = useDeleteProductMutation();
  const handleDeleteProduct = async (product: IProduct) => {
    toast.loading("Pending...", { id: "Delete_Product" });
    try {
      const res = await deleteProduct(product.id).unwrap();
      if (res.success) {
        toast.success("Successfully deleted", { id: "Delete_Product" });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message, { id: "Delete_Product" });
      console.log(error);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6">
      <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
        <Card className="grid flex-1 h-full shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Products</CardTitle>
            <CardDescription>
              Manage your products and view their details.
            </CardDescription>
            <div className="flex justify-between pt-6">
              <Input
                onChange={(e) => setSearchTerm(e.target.value)}
                type="search"
                placeholder="Search by name"
                className="max-w-sm"
              />
              <Modal
                dialogTrigger={
                  <Button>
                    <Plus size={16} />
                    Add Product
                  </Button>
                }
                dialogTitle="Add Product"
              >
                <AddProductForm />
              </Modal>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] md:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Stock</TableHead>
                  <TableHead className="hidden md:table-cell">Price</TableHead>
                  <TableHead>Discount</TableHead>
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
                    products?.map((item: IProduct, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          <img
                            src={item.image}
                            alt="user"
                            className="w-full max-w-16"
                          />
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <p className="font-semibold">{item.name}</p>
                        </TableCell>
                        <TableCell className="">{item.stock}</TableCell>
                        <TableCell className="">৳ {item.price}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          ৳ {item.discount}
                        </TableCell>
                        <TableCell className="">
                          <Badge
                            variant={"outline"}
                            className={`rounded-full ${
                              item.status === "ACTIVE"
                                ? "border-green-500"
                                : item.status === "DRAFT"
                                ? "border-yellow-500"
                                : item.status === "PAUSED"
                                ? "border-red-500"
                                : ""
                            }`}
                          >
                            {capitalizeFirstLetter(item.status)}
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
                              {/* <OrderDetails order={item} /> */}
                              {/* cancel button */}
                              <DropdownMenuItem
                                className="gap-1"
                                onClick={() => handleDuplicateProduct(item)}
                              >
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-1">
                                <EditProductDialogue product={item} />
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="gap-1 text-red-500"
                                onClick={() => handleDeleteProduct(item)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
              {products?.length < 1 && (
                <TableCaption>
                  {/* show no data found message if bookings is empty */}
                  <div className="text-center w-full mt-14">
                    <h3 className="text-2xl font-bold tracking-tight">
                      No products found
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
          {products?.length > 0 && (
            <CardFooter className="pb-2">
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-{products?.length}</strong> of{" "}
                <strong>{products?.length}</strong>
              </div>
            </CardFooter>
          )}
          <CardFooter>
            <CustomPagination pages={pages} page={page} setPage={setPage} />
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default MyProducts;
