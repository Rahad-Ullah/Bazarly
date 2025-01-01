import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  addToCart,
  resetCart,
  selectCartProducts,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IProduct } from "@/types/TProduct";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

const AddToCart = ({ product }: { product: IProduct }) => {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(selectCartProducts);

  const isShopSame = cartProducts.find(
    (item) => item.product.shopId === product.shopId
  );

  // Logic to trigger the dialog
  const handleAddToCart = () => {
    // if not same shop products then show a dialog, else add to cart
    if (cartProducts.length && !isShopSame) {
      setOpen(true);
    } else {
      dispatch(
        addToCart({
          product,
          quantity: 1,
          price: product?.price,
        })
      );
    }
  };

  // Action on confirmation
  const handleReplace = () => {
    dispatch(resetCart());
    dispatch(
      addToCart({
        product,
        quantity: 1,
        price: product?.price,
      })
    );
    setOpen(false); // Close the dialog
  };

  return (
    <div>
      {/* Trigger the dialog programmatically */}
      <Button
        onClick={handleAddToCart}
        variant={"secondary"}
        className="w-full gap-2 text-primary group-hover:bg-primary group-hover:text-white"
      >
        <ShoppingCart size={20} /> Add To Cart
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You are trying to add another shop products. This will replace
              your previous added products from cart.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleReplace}>
              Replace
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AddToCart;
