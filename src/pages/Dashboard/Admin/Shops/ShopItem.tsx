import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";
import { useGetShopFollowersQuery } from "@/redux/features/followedShop/followedShopApi";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { useGetShopReviewQuery } from "@/redux/features/review/reviewApi";
import { useChangeShopStatusMutation } from "@/redux/features/shop/shopApi";
import { IShop } from "@/types/TShop";
import { Rating } from "primereact/rating";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ShopItem = ({ shop }: { shop: IShop }) => {
  const { data } = useGetShopFollowersQuery(shop?.id);
  const followers = data?.data?.meta?.total;

  const { data: reviewData } = useGetShopReviewQuery(shop?.id);
  const rating = reviewData?.data?.rating;
  const reviews = reviewData?.data?.reviews?.length;

  const { data: shopProductsData } = useGetAllProductsQuery({});
  const shopProductsCount = shopProductsData?.meta?.total;

  // change shop status
  const [blockVendor] = useChangeShopStatusMutation();
  const handleStatusChange = async (value: string) => {
    toast.loading("Pending...", { id: "Shop_Status" });
    try {
      const res = await blockVendor({
        id: shop.id,
        payload: {
          status: value,
        },
      }).unwrap();
      if (res.success) {
        toast.success("Successfully changed", { id: "Shop_Status" });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message, { id: "Shop_Status" });
      console.log(error);
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        <Link to={`/shops/${shop.id}`}>
          <img src={shop.logoUrl} alt="product" className="w-full max-w-16" />
        </Link>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Link to={`/shops/${shop.id}`}>
          <p className="font-semibold">{shop.name}</p>
        </Link>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Rating
          value={rating}
          cancel={false}
          readOnly
          className="flex gap-1 text-primary mb-4"
        />
      </TableCell>
      <TableCell className="">{reviews}</TableCell>
      <TableCell className="hidden md:table-cell">{followers}</TableCell>
      <TableCell className="">{shopProductsCount}</TableCell>
      <TableCell className="overflow-x-hidden">
        <Select
          defaultValue={shop?.status}
          onValueChange={(value) => handleStatusChange(value)}
        >
          <SelectTrigger className="max-w-28">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="SUSPENDED">Suspended</SelectItem>
            <SelectItem value="BLOCKED">Blocked</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
    </TableRow>
  );
};

export default ShopItem;
