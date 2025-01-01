import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hook";
import { IProduct } from "@/types/TProduct";
import { Eye, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        quantity: 1,
        price: product?.price,
      })
    );
  };

  return (
    <Card className="border-none shadow-sm hover:shadow-lg group flex flex-col justify-between">
      <Link to={`/products/${product?.id}`}>
        <CardHeader className="pb-3">
          <img
            src={product?.image}
            alt="product-image"
            className="pb-2 object-cover w-full h-56 rounded-lg"
          />
          <CardTitle className="text-lg font-semibold text-zinc-900">
            {product?.name}
          </CardTitle>
        </CardHeader>
      </Link>
      <CardContent>
        <p className="flex items-center gap-2 font-medium text-slate-950">
          <span className="text-primary text-lg font-semibold">
            {product?.price}৳
          </span>
          <span className="text-zinc-500 line-through">
            {product?.price + product?.discount}৳
          </span>
        </p>
      </CardContent>
      <CardFooter className="grid gap-2">
        <Button
          onClick={handleAddToCart}
          variant={"secondary"}
          className="w-full gap-2 text-primary group-hover:bg-primary group-hover:text-white"
        >
          <ShoppingCart size={20} /> Add To Cart
        </Button>
        <Link to={`/products/${product.id}`}>
          <Button variant={"ghost"} className="w-full gap-2">
            <Eye size={20} /> View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
