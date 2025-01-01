import { Button } from "@/components/ui/button";
import { IProduct } from "@/types/TProduct";
import { CopyPlus } from "lucide-react";
import { Link } from "react-router-dom";

const RelatedProductCard = ({ product }: { product: IProduct }) => {
  const price = product?.price;
  const totalPrice = price + product?.discount;
  const discountParcent = (product?.discount / totalPrice) * 100;

  return (
    <div className="flex py-5 border-t gap-2">
      <Link to={`/products/${product?.id}`}>
        <img src={product?.image} className="max-w-28" alt="product-image" />
      </Link>
      <div>
        <Link to={`/products/${product?.id}`}>
          <h1 className="font-semibold hover:text-primary">{product?.name}</h1>
        </Link>
        {/* Price */}
        <h2 className="py-1 text-base">
          <span className="text-base font-bold text-primary">৳{price}</span>
          <p className="space-x-2 text-sm">
            <span className="line-through text-zinc-700">৳{totalPrice}</span>
            <span>{`-${Math.round(discountParcent)}%`}</span>
          </p>
        </h2>
        <Button variant={"ghost"} className="w-full gap-2">
          <CopyPlus size={20} /> Add to Compare
        </Button>
      </div>
    </div>
  );
};

export default RelatedProductCard;
