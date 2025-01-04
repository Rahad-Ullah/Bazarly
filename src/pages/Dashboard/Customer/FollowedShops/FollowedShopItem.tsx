import { TableCell, TableRow } from "@/components/ui/table";
import { useGetShopFollowersQuery } from "@/redux/features/followedShop/followedShopApi";
import { useGetShopReviewQuery } from "@/redux/features/review/reviewApi";
import { IShop } from "@/types/TShop";
import { Rating } from "primereact/rating";
import { Link } from "react-router-dom";

const FollowedShopItem = ({ shop }: { shop: IShop }) => {
  const { data } = useGetShopFollowersQuery(shop?.id);
  const followers = data?.data?.meta?.total;

  const { data: reviewData } = useGetShopReviewQuery(shop?.id);
  const rating = reviewData?.data?.rating;

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
      <TableCell className="">
        <Rating
          value={rating}
          cancel={false}
          readOnly
          className="flex gap-1 text-primary mb-4"
        />
      </TableCell>
      <TableCell className="">{followers}</TableCell>
    </TableRow>
  );
};

export default FollowedShopItem;
