import { TableCell, TableRow } from "@/components/ui/table";
import RatingDisplay from "@/pages/Comparison/ComparisonUtils/Rating";
import { IProduct } from "@/types/TProduct";
import { Link } from "react-router-dom";

const RecentViewedItem = ({ item }: { item: IProduct }) => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <Link to={`/products/${item.id}`}>
          <img src={item.image} alt="product" className="w-full max-w-16" />
        </Link>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Link to={`/products/${item.id}`}>
          <p className="font-semibold">{item.name}</p>
        </Link>
      </TableCell>
      <TableCell className="">
        <RatingDisplay product={item} />
      </TableCell>
      <TableCell className="">৳ {item.price}</TableCell>
      <TableCell className="hidden md:table-cell">৳ {item.discount}</TableCell>
    </TableRow>
  );
};

export default RecentViewedItem;
